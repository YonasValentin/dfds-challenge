export interface VoyageProgressProps {
  portOfLoading: string;
  portOfDischarge: string;
  departureTime: Date | string;
  arrivalTime: Date | string;
}

export interface DotProps {
  portOfLoading: string;
  portOfDischarge: string;
  isActive?: any;
  idx: any;
}
