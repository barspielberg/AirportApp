using AirportAppCommon.Enums;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;
using System.Windows.Data;

namespace AirportAppFlightGenerator.Converters
{
    public class DirectionToColorConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is Direction direction)
            {
                return direction switch
                {
                    Direction.Landing => "red",
                    Direction.Takeoff => "lightgreen",
                    _ => "white"
                };
            }
            return "white";
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
