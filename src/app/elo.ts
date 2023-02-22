export class Elo {
    json: JSON = JSON;
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
}
