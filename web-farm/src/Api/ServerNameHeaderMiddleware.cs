using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace Api
{
    public class ServerNameHeaderMiddleware
    {
        private readonly RequestDelegate next;

        public ServerNameHeaderMiddleware(RequestDelegate next) =>
            this.next = next;

        public async Task Invoke(HttpContext context)
        {
            context.Response.Headers.Append("X-Server-Name", Environment.MachineName);
            await next.Invoke(context);
        }
    }

    public static class ServerNameHeaderMiddlewareExtensions
    {
        public static IApplicationBuilder UseServerNameHeader(this IApplicationBuilder builder) =>
            builder.UseMiddleware<ServerNameHeaderMiddleware>();
    }
}