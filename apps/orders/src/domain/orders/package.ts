export type TPackageDimensions = { height: number, length: number, width: number }

export class Package {
    private readonly _volume: number;

    constructor(private readonly _dimensions: TPackageDimensions, private readonly _weight: number) {
        this._volume = this.calculateVolume(_dimensions)
    }

    get dimensions(): TPackageDimensions {
        return this._dimensions;
    }

    get volume(): number {
        return this._volume;
    }

    get weight(): number {
        return this._weight;
    }

    private calculateVolume({height, width, length}: TPackageDimensions): number {
        return height * length * width;
    }
}
