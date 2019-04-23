using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class CacheController : Controller
    {
        private readonly IDistributedCache cache;

        public CacheController(IDistributedCache cache) =>
            this.cache = cache;

        [HttpGet]
        public async Task<IActionResult> Get(string key)
        {
            var value = await cache.GetStringAsync(key);
            if (value == null) { return NotFound(); }
            return Json(value);
        }

        [HttpPost]
        public async Task<IActionResult> Post(string key, string value)
        {
            await cache.SetStringAsync(
                key,
                value,
                new DistributedCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromHours(1)));
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(string key)
        {
            await cache.RemoveAsync(key);
            return NoContent();
        }
    }
}
