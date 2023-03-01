import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { DotProps, VoyageProgressProps } from './types';

/*
Define some styled components using `styled` from the @emotion/styled library. 
*/
const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AxisContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
`;

const Dot = styled.div<DotProps>`
    width: 15px;
    height: 15px;
    border-radius: 100%;

    :first-of-type,
    :nth-last-of-type(2) {
        position: relative;
        height: 40px;
        width: 40px;
    }

    :first-of-type::before,
    :nth-last-of-type(2)::before {
        position: absolute;
        font-weight: 600;
        bottom: -50px;
        font-size: 24px;
        left: 50%;
        transform: translateX(-50%);
    }

    :first-of-type::before {
        content: '${({ portOfLoading }) => portOfLoading}';
        color: #4d4e4c;
        font-weight: normal;
    }

    :nth-last-of-type(2)::before {
        content: '${({ portOfDischarge }) => portOfDischarge}';
        color: #4d4e4c;
        font-weight: normal;
    }
`;

const PointerDiv = styled.div<{ position: number }>`
    position: absolute;
    top: -4rem;
    left: ${({ position }) => position + '%'};
    transform: translateX(-${({ position }) => position + '%'});
`;

const VoyageProgress: React.FC<VoyageProgressProps> = ({
    portOfLoading,
    portOfDischarge,
    departureTime,
    arrivalTime,
}) => {
    const dots = 14;
    const [pinPosition, setPinPosition] = useState(0);
    const [progress, setProgress] = useState(0);

    /* 
    Get the current time, departure time, and arrival time as timestamps
    and
    Calculate the total duration of the voyage and the elapsed duration
  */
    const currentTime = new Date().getTime();
    const departure = new Date(departureTime).getTime();
    const arrival = new Date(arrivalTime).getTime();
    const totalDuration = arrival - departure;
    const elapsedDuration = currentTime - departure;

    // Use the useEffect hook to update the position of the pointer and the progress
    useEffect(() => {
        // Calculate the position of the pointer as a percentage
        const position = (elapsedDuration / totalDuration) * 100;

        console.log(position);

        // Calculate the progress as the number of dots that have been passed
        const newProgress = Math.round((pinPosition / 100) * dots);

        setPinPosition(position > 100 ? 100 : position);
        setProgress(newProgress);
    }, [currentTime, pinPosition, departureTime, arrivalTime]);

    return (
        <Container>
            <AxisContainer>
                {[...Array(dots)].map((dot, idx) => (
                    <Dot
                        key={idx}
                        portOfLoading={portOfLoading}
                        portOfDischarge={portOfDischarge}
                        isActive={progress >= 0}
                        idx={idx}
                        style={{
                            backgroundColor:
                                idx < progress ? '#345371' : '#83A2C1',
                        }}
                    />
                ))}

                <PointerDiv position={Math.round(pinPosition)}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='#345371'
                        width={50}
                        height={50}
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                        />
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                        />
                    </svg>
                </PointerDiv>
            </AxisContainer>
        </Container>
    );
};

export default VoyageProgress;
