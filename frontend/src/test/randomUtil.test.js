import RandomUtil from '../utils/randomUtil';
import seedrandom from 'seedrandom';

describe("RandomUtil", () => {
    it("creates a generator with a seed", () => {
        const seed = "test-seed";
        const rng = RandomUtil.createGenerator(seed);
        expect(rng).toBeInstanceOf(Function);
    });

    it("generates a random array with default length and range", () => {
        const seed = "test-seed";
        const rng = RandomUtil.createGenerator(seed);
        const randomArray = RandomUtil.generateRandomArray(rng);
        expect(randomArray).toHaveLength(10);
        randomArray.forEach(num => {
            expect(num).toBeGreaterThanOrEqual(0);
            expect(num).toBeLessThanOrEqual(1);
        });
    });

    it("generates a random array with specified length and range", () => {
        const seed = "test-seed";
        const rng = RandomUtil.createGenerator(seed);
        const randomArray = RandomUtil.generateRandomArray(rng, 5, 10, 20);
        expect(randomArray).toHaveLength(5);
        randomArray.forEach(num => {
            expect(num).toBeGreaterThanOrEqual(10);
            expect(num).toBeLessThanOrEqual(20);
        });
    });

    it("generates a random number with default range", () => {
        const seed = "test-seed";
        const rng = RandomUtil.createGenerator(seed);
        const randomNumber = RandomUtil.generateRandomNumber(rng);
        expect(randomNumber).toBeGreaterThanOrEqual(0);
        expect(randomNumber).toBeLessThanOrEqual(1);
    });

    it("generates a random number with specified range", () => {
        const seed = "test-seed";
        const rng = RandomUtil.createGenerator(seed);
        const randomNumber = RandomUtil.generateRandomNumber(rng, 10, 20);
        expect(randomNumber).toBeGreaterThanOrEqual(10);
        expect(randomNumber).toBeLessThanOrEqual(20);
    });

    it("generates a random integer with default range", () => {
        const seed = "test-seed";
        const rng = RandomUtil.createGenerator(seed);
        const randomInt = RandomUtil.generateRandomInt(rng);
        expect(randomInt).toBeGreaterThanOrEqual(0);
        expect(randomInt).toBeLessThanOrEqual(100);
        expect(Number.isInteger(randomInt)).toBe(true);
    });

    it("generates a random integer with specified range", () => {
        const seed = "test-seed";
        const rng = RandomUtil.createGenerator(seed);
        const randomInt = RandomUtil.generateRandomInt(rng, 10, 20);
        expect(randomInt).toBeGreaterThanOrEqual(10);
        expect(randomInt).toBeLessThanOrEqual(20);
        expect(Number.isInteger(randomInt)).toBe(true);
    });
});