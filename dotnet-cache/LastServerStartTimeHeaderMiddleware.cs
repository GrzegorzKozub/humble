using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Distributed;

namespace dotnet_cache
{
    public class LastServerStartTimeHeaderMiddleware
    {
        private readonly RequestDelegate next;
        private readonly IDistributedCache cache;

        public LastServerStartTimeHeaderMiddleware(
            RequestDelegate next,
            IDistributedCache cache)
        {
            this.next = next;
            this.cache = cache;
        }

        public async Task Invoke(HttpContext context)
        {
            const string headerAndKeyName = "Last-Server-Start-Time";
            var cached = await cache.GetAsync(headerAndKeyName);
            if (cached != null)
            {
                context.Response.Headers.Append(headerAndKeyName, Encoding.UTF8.GetString(cached));
            }
            await next.Invoke(context);
        }
    }

    public static class LastServerStartTimeHeaderMiddlewareExtensions
    {
        public static IApplicationBuilder UseLastServerStartTimeHeader(this IApplicationBuilder builder) =>
            builder.UseMiddleware<LastServerStartTimeHeaderMiddleware>();
    }
}
