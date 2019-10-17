using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class HealthController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Json(new { Health = "OK" });
        }
    }
}
