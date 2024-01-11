export interface Launch {
    readonly id: string;
    name: string;
  rocket: {
    configuration: {
      name: string;
      variant: string;
    };
  };
  net: string | null;
  pad: {
    country_code: string;
    location: {
      country_code: string;
    };
  }
  launch_service_provider: {
    name: string | null;
    type: string;
  }
  mission: {
    name: string | null;
    description: string;
    orbit: {
      name: string;
    };
  };
}