const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', (event) => {
    socket.send('Hello Server!');
});

socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    if (data.destination === 'backstage') {
        const cabs = data.cabs;

        console.log('\n\n--------------------');
        console.log('cabs', cabs.length);
        console.log('arrived', cabs.filter((c) => c.status === 'ARRIVED').length);

        console.log(
            cabs.map((c) => ({
                minutesAway: c.minutesAway,
                status: c.status,
                isInTrafficJam: c.isInTrafficJam,
                rating: c.rating,
                ratings: c.ratings,
            })),
        );
    }
});
