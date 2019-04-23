using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Api
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDistributedRedisCache(options =>
            {
                options.Configuration = Dns
                    .GetHostAddressesAsync("webfarm_web-farm-cache_1")
                    .Result
                    .FirstOrDefault()?.ToString() ?? "localhost";
                options.InstanceName = "web-farm-cache";
            });
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseServerNameHeader();
            app.UseMvc();
        }
    }
}
