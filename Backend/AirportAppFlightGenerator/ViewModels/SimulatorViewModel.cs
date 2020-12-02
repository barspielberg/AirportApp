using AirportAppCommon.Api.DTOInterfaces;
using AirportAppCommon.DTO;
using AirportAppCommon.Enums;
using AirportAppCommon.Models;
using GalaSoft.MvvmLight;
using GalaSoft.MvvmLight.Command;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace AirportAppFlightGenerator.ViewModels
{
    public class SimulatorViewModel : ViewModelBase
    {
        public RelayCommand SendRandomPlanesInLoopCommand { get; set; }
        public RelayCommand ReconnectCommand { get; set; }
        public RelayCommand StopCommand { get; set; }
        public ObservableCollection<ControlTower> Towers { get => towers; set { Set(ref towers, value); } }
        public ObservableCollection<Flight> SendedFlights { get; set; } = new ObservableCollection<Flight>();

        public bool Loading { get => loading; set { Set(ref loading, value); } }
        public bool Sending
        {
            get => sending; set
            {
                sending = value;
                StopCommand.RaiseCanExecuteChanged();
                SendRandomPlanesInLoopCommand.RaiseCanExecuteChanged();
            }
        }


        public int SendTimeValue { get; set; } = 8;
        public int SendMinTime { get; set; } = 1;
        public int SendMaxTime { get; set; } = 15;

        public int DateTimeValue { get; set; } = 5;
        public int DateMinTime { get; set; } = 0;
        public int DateMaxTime { get; set; } = 20;
        public ControlTower SelectedTower
        {
            get => selectedTower; set
            {
                selectedTower = value;
                SendRandomPlanesInLoopCommand.RaiseCanExecuteChanged();
            }
        }

        private readonly HttpClient client = new HttpClient();
        private ObservableCollection<ControlTower> towers;
        private ControlTower selectedTower;
        private bool loading;
        private const string URL = "http://localhost:52961/api/Airport/";
        private Random rnd = new Random();
        private bool sending;

        public SimulatorViewModel()
        {
            ReconnectCommand = new RelayCommand(ReconnectAsync);
            SendRandomPlanesInLoopCommand = new RelayCommand(SendRandomPlanesInLoopAsync, CanSendPlanes);
            StopCommand = new RelayCommand(() => Sending = false, () => Sending);

            Towers = new ObservableCollection<ControlTower>();

            ReconnectAsync();
        }

        private bool CanSendPlanes()
        {
            return SelectedTower != null && !Sending;
        }

        private async void ReconnectAsync()
        {
            Loading = true;
            var response = await client.GetAsync(URL + "ControlTowers");
            var towerRes = await response.Content.ReadAsAsync<IEnumerable<ControlTower>>();
            Towers = new ObservableCollection<ControlTower>(towerRes);
            Loading = false;
        }
        private async void SendRandomPlanesInLoopAsync()
        {
            Sending = true;
            while (Sending)
            {
                await SendRandomPlaneAsync();
                await Task.Delay(SendTimeValue * 1000);
            }
        }


        private async Task SendRandomPlaneAsync()
        {
            var res = await client.GetAsync("http://names.drycodes.com/1");
            var randomName = (await res.Content.ReadAsAsync<IEnumerable<string>>()).FirstOrDefault() ?? "No_Name:(";

            var flight = new Flight
            {
                Name = randomName,
                Date = DateTime.Now + TimeSpan.FromSeconds(DateTimeValue),
                Direction = (Direction)rnd.Next(0, 2),
                ControlTowerId = selectedTower.Id,
                ControlTower = selectedTower
            };
            SendedFlights.Add(flight);
      
            await client.PostAsJsonAsync(URL + "Flight", flight);
        }
    }
}
