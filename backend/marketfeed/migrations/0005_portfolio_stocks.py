# Generated by Django 4.2 on 2024-12-09 20:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("marketfeed", "0004_remove_portfolio_stocks_portfoliostock"),
    ]

    operations = [
        migrations.AddField(
            model_name="portfolio",
            name="stocks",
            field=models.ManyToManyField(
                through="marketfeed.PortfolioStock",
                to="marketfeed.stock",
                verbose_name="list of stocks in the portfolio",
            ),
        ),
    ]
