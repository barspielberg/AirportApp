using AirportAppFlightGenerator.ViewModels;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace AirportAppFlightGenerator
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public static IServiceProvider Provider { get; private set; }

        private void Application_Startup(object sender, StartupEventArgs e)
        {
            var services = new ServiceCollection();

            services.AddScoped<MainWindow>();
            services.AddScoped<SimulatorViewModel>();

            Provider = services.BuildServiceProvider();

            Provider.GetRequiredService<MainWindow>().Show();
        }
    }
}
