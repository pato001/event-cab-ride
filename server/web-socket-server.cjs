"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var random_object_key_1 = require("random-object-key");
var random_item_1 = require("random-item");
var random_int_1 = require("random-int");
var yargs_1 = require("yargs");
var wss = new ws_1.WebSocketServer({ port: 8080 });
var argv = (0, yargs_1.default)(process.argv.slice(2))
    .options({
    minute: { type: 'number', default: 60 },
})
    .parseSync();
var MODELS = {
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
var count = 0;
function getMinute(minute) {
    if (minute === void 0) { minute = 1; }
    return argv.minute * minute;
}
var Cab = /** @class */ (function () {
    function Cab(collection) {
        var _a, _b;
        this.collection = collection;
        this.id = "".concat(count++);
        this.model = (0, random_object_key_1.default)(MODELS);
        this.segment = (0, random_item_1.default)((_a = MODELS[this.model].segments) !== null && _a !== void 0 ? _a : [
            'Economy',
            'Compact',
            'Luxury',
            'Supercar',
            'Premium',
        ]);
        this.trunk = (0, random_item_1.default)((_b = MODELS[this.model].trunk) !== null && _b !== void 0 ? _b : ['S', 'M', 'L']);
        this.capacity = random_int_1.default.apply(void 0, MODELS[this.model].capacity);
        this.rating = (0, random_int_1.default)(0, 5) || undefined;
        this.ratings = this.rating ? (0, random_int_1.default)(1, 490) : 0;
        this.minutesAway = (0, random_int_1.default)(1, 6);
        this.status = 'ARRIVING_SOON';
        this.isInTrafficJam = false;
    }
    Cab.prototype.toJSON = function () {
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
    };
    Cab.prototype.tick = function () {
        if (this.status === 'ARRIVED') {
            return;
        }
        this.isInTrafficJam = (0, random_item_1.default)([true, false]);
        if (this.isInTrafficJam) {
            this.minutesAway = (0, random_int_1.default)(this.minutesAway, this.minutesAway + (0, random_int_1.default)(1, 3));
        }
        else {
            this.minutesAway = Math.max(this.minutesAway - (0, random_int_1.default)(1, 2), 0);
        }
        if (this.minutesAway === 0) {
            this.status = 'ARRIVED';
            this.collection.remove(this);
            this.collection.add();
        }
    };
    return Cab;
}());
var Collection = /** @class */ (function () {
    function Collection() {
        var _this = this;
        this.items = Array.from({ length: (0, random_int_1.default)(5, 9) }, function () { return new Cab(_this); });
    }
    Collection.prototype.add = function () {
        var _this = this;
        setTimeout(function () {
            var _a;
            var cabs = Array.from({ length: (0, random_int_1.default)(1, 2) }, function () { return new Cab(_this); });
            (_a = _this.items).push.apply(_a, cabs);
        }, 1000 * (0, random_item_1.default)([1, 1.25, 1.5, 1.75, 2, 2.25, 2.5].map(getMinute)));
    };
    Collection.prototype.remove = function (cab) {
        var _this = this;
        setTimeout(function () {
            _this.items = _this.items.filter(function (item) { return item !== cab; });
        }, 1000 * (0, random_item_1.default)([1, 1.25, 1.5, 1.75, 2].map(getMinute)));
    };
    return Collection;
}());
var destinations = {
    'main-venue': new Collection(),
    'players-entrance': new Collection(),
    backstage: new Collection(),
    'cargo-entry': new Collection(),
};
wss.on('connection', function (ws) {
    function tick() {
        Object.entries(destinations).forEach(function (_a) {
            var destination = _a[0], items = _a[1].items;
            items.forEach(function (item) { return item.tick(); });
            ws.send(JSON.stringify({
                destination: destination,
                cabs: items.map(function (item) { return item.toJSON(); }),
            }));
        });
    }
    tick();
    setInterval(function () {
        tick();
    }, 1000 * (getMinute() / 3));
    ws.on('error', console.error);
    // ws.on('message', (data) => {
    //     console.log('received: %s', data);
    // });
});
console.info('server:started');
