using System;
using System.Linq;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.DependencyInjection;

namespace dotnet_cache
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMemoryCache();
            services.AddDistributedRedisCache(options =>
            {
                options.Configuration = "localhost";
                options.InstanceName = "core-cache";
            });
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IDistributedCache cache)
        {
            if (env.IsDevelopment()) { app.UseDeveloperExceptionPage(); }
            app.UseLastServerStartTimeHeader();
            app.UseMvcWithDefaultRoute();
            cache.Set(
                "Last-Server-Start-Time",
                Encoding.UTF8.GetBytes(DateTime.Now.ToString()),
                new DistributedCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(10)));
        }
    }
}
