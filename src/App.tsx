import VoyageProgress from './VoyageProgress';

const App = () => {
    const portOfLoading = 'Karlshamn';
    const portOfDischarge = 'Klaipeda';
    //Year, Month (starts with 0), Day, Hour, Minute, Second, MileSecond
    const departureTime = new Date(2023, 2, 1, 8, 0, 2, 0);
    const arrivalTime = new Date(2023, 2, 1, 21, 0, 2, 0);

    return (
        <>
            <VoyageProgress
                portOfLoading={portOfLoading}
                portOfDischarge={portOfDischarge}
                departureTime={departureTime}
                arrivalTime={arrivalTime}
            />
        </>
    );
};

export default App;
