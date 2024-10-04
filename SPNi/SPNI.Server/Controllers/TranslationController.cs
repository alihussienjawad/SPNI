 
using Microsoft.AspNetCore.Mvc;
 
using SPNI.Server.DTO;
using SPNI.Server.Services;
 

namespace SPNI.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TranslationController : ControllerBase
    {


        private readonly PythonService _pythonService;

        public TranslationController(PythonService pythonService)
        {
            _pythonService = pythonService;
        }

        [HttpPost("translate")]
        public IActionResult Translate(TranslatorDto dto)
        {
            var translatedText = _pythonService.RunTranslation(dto);
            return Ok(translatedText.TrimEnd('.'));
        }

    }
}

 