using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace AirportAppFlightGenerator.ViewModels
{
    public class ViewModelLocator
    {
        public SimulatorViewModel Simulator =>App.Provider.GetRequiredService<SimulatorViewModel>();
    }
}
