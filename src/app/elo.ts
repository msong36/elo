export class Elo {
    json: { [key: string]: { "elo": number, "iterations": number } } = {};
    len: number = -1;
    indexMap: Map<number, string> = new Map();
    filepath: string = "";
    ready: Promise<void>;
    constructor(jsonFilepath: string, assetDirectory: string) {
        console.log("constructed");
        this.filepath = assetDirectory;
        // load json and populate json and indexMap
        this.ready = new Promise((resolve) => {
            fetch(jsonFilepath)
                .then(response => response.json())
                .then(loadedJson => {
                    this.json = loadedJson;
                    /* console.log(console.log(loadedJson["nose_1435.png"]));
                    console.log(this.json["nose_1435.png"]); */
                    this.len = Object.keys(this.json).length;
                    for (var i = 0; i < this.len; i++) {
                        this.indexMap.set(i, Object.keys(this.json)[i]);
                    }
                    resolve();
                });
        })
    };
    hello(): string {
        return "Hello, World!";
    }

    // helper function to dispatchTask for now
    // returns an array of size batchSize consisting of random unique tuples
    getBatch(batchSize: number): Array<[number, number]> {
        var batch: Array<[number, number]> = [];

        while (batch.length < batchSize) {
            const num1 = Math.floor(Math.random() * (this.len));
            const num2 = Math.floor(Math.random() * (this.len));
            const tuple = [num1, num2];

            if (!batch.some(t => t[0] === num1 && t[1] === num2)) {
                batch.push(tuple as [number, number]);
            }
        }

        return batch;
    }

    // returns raw batch and filepath
    generateTask(taskSize: number): [Array<[number, number]>, Array<[string, string]>] {
        var batch: Array<[number, number]> = this.getBatch(taskSize);
        var output: Array<[string, string]> = [];
        for (var i = 0; i < batch.length; i++) {
            let index0: number = batch[i][0], index1: number = batch[i][1];
            let str0 = this.indexMap.get(index0), str1 = this.indexMap.get(index1);
            output.push([this.filepath + str0, this.filepath + str1]);
        }

        return [batch, output];
    }

    // adjusts ratings given the game results
    adjustRatings(imageArray: Array<[number, number]>, gameResults: Array<string>): void {
        function expected(rating1: number, rating2: number): number {
            return 1 / (1 + 10 ** ((rating2 - rating1) / 400));
        }

        for (let i = 0; i < imageArray.length; i++) {
            let img0 = this.json[(this.indexMap.get(imageArray[i][0])) as string];
            let img1 = this.json[(this.indexMap.get(imageArray[i][1])) as string];
            let scores = [0.5, 0.5];
            if (gameResults[i] === "win") {
                scores = [1, 0];
            } else if (gameResults[i] === "lose") {
                scores = [0, 1];
            }
            console.log(img0.elo, img1.elo);
            let img0_old = img0.elo, img1_old = img1.elo;
            img0.elo = Math.round(img0_old + 32 * (scores[0] - expected(img0_old, img1_old)));
            img1.elo = Math.round(img1_old + 32 * (scores[1] - expected(img1_old, img0_old)));
            img0.iterations += 1;
            img1.iterations += 1;
        }

        console.log(this.json);
        return;
    }
}
