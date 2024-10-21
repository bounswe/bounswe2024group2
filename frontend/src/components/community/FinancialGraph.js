import React, { Component } from "react";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import {
    elderRay,
    ema,
    discontinuousTimeScaleProviderBuilder,
    Chart,
    ChartCanvas,
    CurrentCoordinate,
    BarSeries,
    CandlestickSeries,
    ElderRaySeries,
    LineSeries,
    MovingAverageTooltip,
    OHLCTooltip,
    SingleValueTooltip,
    lastVisibleItemBasedZoomAnchor,
    XAxis,
    YAxis,
    CrossHairCursor,
    EdgeIndicator,
    MouseCoordinateX,
    MouseCoordinateY,
    ZoomButtons,
} from "react-financial-charts";
import { initialData } from "../../data/graphData";

class FinancialChart extends Component {
    constructor(props) {
        super(props);
        this.ScaleProvider = discontinuousTimeScaleProviderBuilder().inputDateAccessor(
            (d) => new Date(d.date)
        );
        this.height = 700;
        this.width = 900;
        this.margin = { left: 0, right: 48, top: 0, bottom: 24 };

        this.ema12 = ema()
            .id(1)
            .options({ windowSize: 12 })
            .merge((d, c) => {
                d.ema12 = c;
            })
            .accessor((d) => d.ema12);

        this.ema26 = ema()
            .id(2)
            .options({ windowSize: 26 })
            .merge((d, c) => {
                d.ema26 = c;
            })
            .accessor((d) => d.ema26);

        this.elder = elderRay();
    }

    render() {
        const { data, xScale, xAccessor, displayXAccessor } = this.ScaleProvider(initialData);
        const pricesDisplayFormat = format(".2f");
        const max = xAccessor(data[data.length - 1]);
        const min = xAccessor(data[Math.max(0, data.length - 100)]);
        const xExtents = [min, max + 5];

        const gridHeight = this.height - this.margin.top - this.margin.bottom;
        const elderRayHeight = 100;
        const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
        const barChartHeight = gridHeight / 4;
        const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
        const chartHeight = gridHeight - elderRayHeight;

        const dateTimeFormat = "%d %b";
        const timeDisplayFormat = timeFormat(dateTimeFormat);

        const barChartExtents = (data) => data.volume;
        const candleChartExtents = (data) => [data.high, data.low];
        const yEdgeIndicator = (data) => data.close;

        const volumeColor = (data) => (data.close > data.open ? "rgba(38, 166, 154, 0.3)" : "rgba(239, 83, 80, 0.3)");
        const volumeSeries = (data) => data.volume;
        const openCloseColor = (data) => (data.close > data.open ? "#26a69a" : "#ef5350");

        return (
            <ChartCanvas
                height={this.height}
                ratio={3}
                width={this.width}
                margin={this.margin}
                data={data}
                displayXAccessor={displayXAccessor}
                seriesName="Data"
                xScale={xScale}
                xAccessor={xAccessor}
                xExtents={xExtents}
                zoomAnchor={lastVisibleItemBasedZoomAnchor}
            >
                <Chart
                    id={2}
                    height={barChartHeight}
                    origin={barChartOrigin}
                    yExtents={barChartExtents}
                >
                    <BarSeries fillStyle={volumeColor} yAccessor={volumeSeries} />
                </Chart>
                <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
                    <XAxis showGridLines showTickLabel={false} />
                    <YAxis showGridLines tickFormat={pricesDisplayFormat} />
                    <CandlestickSeries />
                    <LineSeries yAccessor={this.ema26.accessor()} strokeStyle={this.ema26.stroke()} />
                    <CurrentCoordinate yAccessor={this.ema26.accessor()} fillStyle={this.ema26.stroke()} />
                    <LineSeries yAccessor={this.ema12.accessor()} strokeStyle={this.ema12.stroke()} />
                    <CurrentCoordinate yAccessor={this.ema12.accessor()} fillStyle={this.ema12.stroke()} />
                    <MouseCoordinateY rectWidth={this.margin.right} displayFormat={pricesDisplayFormat} />
                    <EdgeIndicator
                        itemType="last"
                        rectWidth={this.margin.right}
                        fill={openCloseColor}
                        lineStroke={openCloseColor}
                        displayFormat={pricesDisplayFormat}
                        yAccessor={yEdgeIndicator}
                    />
                    <MovingAverageTooltip
                        origin={[8, 24]}
                        options={[
                            {
                                yAccessor: this.ema26.accessor(),
                                type: "EMA",
                                stroke: this.ema26.stroke(),
                                windowSize: this.ema26.options().windowSize,
                            },
                            {
                                yAccessor: this.ema12.accessor(),
                                type: "EMA",
                                stroke: this.ema12.stroke(),
                                windowSize: this.ema12.options().windowSize,
                            },
                        ]}
                    />
                    <ZoomButtons />
                    <OHLCTooltip origin={[8, 16]} />
                </Chart>
                <Chart
                    id={4}
                    height={elderRayHeight}
                    yExtents={[0, this.elder.accessor()]}
                    origin={elderRayOrigin}
                    padding={{ top: 8, bottom: 8 }}
                >
                    <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
                    <YAxis ticks={4} tickFormat={pricesDisplayFormat} />
                    <MouseCoordinateX displayFormat={timeDisplayFormat} />
                    <MouseCoordinateY rectWidth={this.margin.right} displayFormat={pricesDisplayFormat} />
                    <ElderRaySeries yAccessor={this.elder.accessor()} />
                    <SingleValueTooltip
                        yAccessor={this.elder.accessor()}
                        yLabel="Elder Ray"
                        yDisplayFormat={(d) => `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(d.bearPower)}`}
                        origin={[8, 16]}
                    />
                </Chart>
                <CrossHairCursor />
            </ChartCanvas>
        );
    }
}

export default FinancialChart;