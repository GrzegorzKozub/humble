using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;

namespace dotnet_cache
{
    public class HomeController : Controller
    {
        private readonly IMemoryCache cache;

        public HomeController(IMemoryCache cache) =>
            this.cache = cache;

        public async Task<IActionResult> Index()
        {
            var cacheValue = await cache.GetOrCreateAsync("cache-key", entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromSeconds(3);
                return Task.FromResult(DateTime.Now);
            });
            return Json(cacheValue);
        }
    }
}
