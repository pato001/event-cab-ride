import { WebSocketServer } from 'ws';
import randomObjectKey from 'random-object-key';
import randomItem from 'random-item';
import randomInteger from 'random-int';
import yargs from 'yargs';

const wss = new WebSocketServer({ port: 8080 });
const argv = yargs(process.argv.slice(2))
    .options({
        minute: { type: 'number', default: 60 },
    })
    .parseSync();

type Trunk = 'S' | 'M' | 'L';
type Segment = 'Economy' | 'Compact' | 'Luxury' | 'Supercar' | 'Premium';
const MODELS: Record<
    string,
    { segments?: Segment[]; trunk?: Trunk[]; capacity: number[] }
> = {
    Hyundai: {
        segments: ['Economy', 'Compact', 'Premium'],
        capacity: [4, 6],
    },
    Toyota: {
        segments: ['Economy', 'Compact', 'Luxury', 'Premium'],
        trunk: ['S', 'M'],
        capacity: [2, 4],
    },
    Lexus: {
        segments: ['Luxury', 'Premium'],
        capacity: [4, 6],
    },
    Tesla: {
        segments: ['Luxury', 'Supercar'],
        capacity: [4, 5],
    },
    Volvo: {
        segments: ['Compact', 'Premium'],
        trunk: ['L'],
        capacity: [4, 6],
    },
    Jaguar: {
        segments: ['Luxury', 'Supercar', 'Premium'],
        trunk: ['M', 'L'],
        capacity: [2, 4],
    },
    Mercedes: {
        segments: ['Compact', 'Luxury', 'Supercar', 'Premium'],
        trunk: ['M', 'L'],
        capacity: [2, 6],
    },
    Chrysler: {
        segments: ['Luxury'],
        trunk: ['M', 'L'],
        capacity: [2, 4],
    },
    Mini: {
        segments: ['Economy', 'Compact'],
        trunk: ['S'],
        capacity: [2, 2],
    },
};

let count = 0;

function getMinute(minute = 1) {
    return argv.minute * minute;
}

class Cab {
    readonly collection: Collection;
    readonly id: string;
    readonly model: keyof typeof MODELS;
    readonly segment: Segment;
    readonly trunk: Trunk;
    readonly capacity: number;
    rating?: number;
    ratings: number;
    minutesAway: number;
    status: 'ARRIVING_SOON' | 'ARRIVED';
    isInTrafficJam: boolean;

    constructor(collection: Collection) {
        this.collection = collection;
        this.id = `${count++}`;
        this.model = randomObjectKey(MODELS);
        this.segment = randomItem<Segment>(
            MODELS[this.model].segments ?? [
                'Economy',
                'Compact',
                'Luxury',
                'Supercar',
                'Premium',
            ],
        );
        this.trunk = randomItem<Trunk>(MODELS[this.model].trunk ?? ['S', 'M', 'L']);
        this.capacity = randomInteger(...MODELS[this.model].capacity);
        this.rating = randomInteger(0, 5) || undefined;
        this.ratings = this.rating ? randomInteger(1, 490) : 0;
        this.minutesAway = randomInteger(1, 6);
        this.status = 'ARRIVING_SOON';
        this.isInTrafficJam = false;
    }

    toJSON() {
        return {
            id: this.id,
            model: this.model,
            segment: this.segment,
            trunk: this.trunk,
            capacity: this.capacity,
            rating: this.rating,
            ratings: this.ratings,
            minutesAway: this.minutesAway,
            status: this.status,
            isInTrafficJam: this.isInTrafficJam,
        };
    }

    tick() {
        if (this.status === 'ARRIVED') {
            return;
        }

        this.isInTrafficJam = randomItem([true, false]);

        if (this.isInTrafficJam) {
            this.minutesAway = randomInteger(
                this.minutesAway,
                this.minutesAway + randomInteger(1, 3),
            );
        } else {
            this.minutesAway = Math.max(this.minutesAway - randomInteger(1, 2), 0);
        }

        if (this.minutesAway === 0) {
            this.status = 'ARRIVED';
            this.collection.remove(this);
            this.collection.add();
        }
    }
}

class Collection {
    items: Cab[];

    constructor() {
        this.items = Array.from({ length: randomInteger(5, 9) }, () => new Cab(this));
    }

    add() {
        setTimeout(
            () => {
                const cabs = Array.from(
                    { length: randomInteger(1, 2) },
                    () => new Cab(this),
                );

                this.items.push(...cabs);
            },
            1000 * randomItem([1, 1.25, 1.5, 1.75, 2, 2.25, 2.5].map(getMinute)),
        );
    }

    remove(cab: Cab) {
        setTimeout(
            () => {
                this.items = this.items.filter((item) => item !== cab);
            },
            1000 * randomItem([1, 1.25, 1.5, 1.75, 2].map(getMinute)),
        );
    }
}

const destinations = {
    'main-venue': new Collection(),
    'players-entrance': new Collection(),
    backstage: new Collection(),
    'cargo-entry': new Collection(),
};

wss.on('connection', (ws) => {
    function tick() {
        Object.entries(destinations).forEach(([destination, { items }]) => {
            items.forEach((item) => item.tick());
            ws.send(
                JSON.stringify({
                    destination,
                    cabs: items.map((item) => item.toJSON()),
                }),
            );
        });
    }

    tick();
    setInterval(
        () => {
            tick();
        },
        1000 * (getMinute() / 3),
    );

    ws.on('error', console.error);

    // ws.on('message', (data) => {
    //     console.log('received: %s', data);
    // });
});

console.info('server:started');
