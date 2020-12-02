using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirportAppBL;
using AirportAppCommon.Api;
using AirportAppDAL.Data;
using AirportAppDAL.Repository;
using AirportAppWebServer.Hubs;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AirportAppWebServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContextPool<AirportContext>(options => options.UseSqlite("Data Source = airport.db"));

            services.AddScoped<IAirportRepository, AirportRepository>();
            services.AddScoped<IDataService, DataService>();

            services.AddSingleton<IStationBuilder, StationBuilder>();
            services.AddSingleton<INotificationService, NotificationService>();
            services.AddSingleton<INotifier, FlightNotifier>();
            services.AddSingleton<IAirportLogger, AirportLogger>();

            services.AddSignalR();
            services.AddControllers();
            services.AddSwaggerGen();
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("http://localhost:3000")
                    .AllowCredentials();
                });
            });           
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Ariport API V1");
                c.RoutePrefix = string.Empty;
            });

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<FlightsHub>("/FlightsHub");
                endpoints.MapControllers();
            });
        }
    }
}
