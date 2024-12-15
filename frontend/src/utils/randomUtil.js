import seedrandom from "seedrandom";

const RandomUtil = {
    createGenerator(seed) {
        return seedrandom(seed);
    },

    generateRandomArray(rng, length = 10, min = 0, max = 1) {
        const randomNumbers = Array.from({ length }, () => min + rng() * (max - min));
        return randomNumbers;
    },

    generateRandomNumber(rng, min = 0, max = 1) {
        return min + rng() * (max - min);
    },

    generateRandomInt(rng, min = 0, max = 100) {
        return Math.floor(min + rng() * (max - min + 1));
    },
};

export default RandomUtil;
