using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPNI.Server.Data;
using SPNI.Server.Model;

namespace SPNI.Server.Controllers
{
    [Authorize(Roles = "RajManger,Admin")]
    [Route("api/[controller]")]
    [ApiController]
  
    public class SpniPdfsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public SpniPdfsController(ApplicationDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        // GET: api/SpniPdfs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpniPdf>>> GetSpniPdfs()
        {
            var x = await (from a in _context.SpniPdfs

                           select new SpniPdf
                           {
                               Color = a.Color,
                               Description = a.Description??"",
                               DescriptionEn = a.DescriptionEn??"",
                               Id = a.Id,
                               Name = a.Name,
                               NameEn = a.NameEn,
                               PdfFileName = a.PdfFileName,
                               sort = a.sort

                           }
                    ).OrderBy(i => i.sort).ToListAsync();
            return x;
        }

        // GET: api/SpniPdfs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<bool>> GetSpniPdf(int id)
        {
            var spniPdf = await _context.SpniPdfs.FindAsync(id);

            if (spniPdf == null)
            {
                return false;
            }

            return true;
        }

        // PUT: api/SpniPdfs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpniPdf(SpniPdfDto pdf)
        {
            string fileName = string.Empty;
            if (ModelState.IsValid)
            {
                if (pdf.file == null)
                {

                    return BadRequest();
                }
                else
                {

                    fileName = "/Pdf/" + pdf.file.FileName;
                    if (!Directory.Exists(_webHostEnvironment.WebRootPath + "/pdf"))
                    {
                        Directory.CreateDirectory(_webHostEnvironment.WebRootPath + "/pdf/");
                    }
                    using FileStream filestream = System.IO.File.Create(_webHostEnvironment.WebRootPath + fileName);
                    pdf.file.CopyTo(filestream);
                    filestream.Flush();
                    try
                    {
                        pdf.PdfFileName = fileName;
                        SpniPdf spniPdf = new SpniPdf();
                        {
                            spniPdf.Name = pdf.Name;
                            spniPdf.NameEn = pdf.NameEn;
                            spniPdf.Description = pdf.Description;
                            spniPdf.DescriptionEn = pdf.DescriptionEn;
                            spniPdf.Color = pdf.Color;
                            spniPdf.Id = pdf.Id;
                            spniPdf.sort = pdf.Sort;
                            spniPdf.PdfFileName = pdf.PdfFileName;
                        }

                        _context.SpniPdfs.Update(spniPdf);
                        return Ok(
                            await _context.SaveChangesAsync() > 0);

                    }
                    catch (Exception ex)
                    {
                        return Ok(false);
                    }





                }

            }

            return Ok(pdf);
        }
        private bool ContextsFileExists(int id)
        {
            return (_context.Imagess?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        // POST: api/SpniPdfs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<IActionResult> PostSpniPdfs(SpniPdfDto pdf) /*, string Description, string color  ,int sort*/
        {
       

              
                   
         

            string fileName = string.Empty;
            if (ModelState.IsValid)
            {
                if (pdf.file == null)
                {

                    return BadRequest();
                }
                else
                {

                    fileName = "/Pdf/" + pdf.file.FileName;
                    if (!Directory.Exists(_webHostEnvironment.WebRootPath + "/pdf"))
                    {
                        Directory.CreateDirectory(_webHostEnvironment.WebRootPath + "/pdf/");
                    }
                    using FileStream filestream = System.IO.File.Create(_webHostEnvironment.WebRootPath + fileName);
                    pdf.file.CopyTo(filestream);
                    filestream.Flush();
                    try
                    {
                        pdf.PdfFileName = fileName;
                        SpniPdf spniPdf = new()
                        {
                            Name = pdf.Name,
                            NameEn = pdf.NameEn,
                            Description = pdf.Description ?? "",
                            DescriptionEn = pdf.DescriptionEn ?? "",
                            Color = pdf.Color,
                            Id = pdf.Id,
                            sort = pdf.Sort,
                            PdfFileName = pdf.PdfFileName
                        };

                        _context.SpniPdfs.Add(spniPdf);
                        return Ok(
                            await _context.SaveChangesAsync() > 0);

                    }
                    catch (Exception ex)
                    {
                        return Ok(false);
                    }





                }

            }

            return Ok(pdf);



        }

        // DELETE: api/SpniPdfs/5
        [HttpDelete("{id}")]
        public async Task<bool> DeleteSpniPdf(int id)
        {
            var spniPdf = await _context.SpniPdfs.FindAsync(id);
            if (spniPdf == null)
            {
                return false;
            }

            _context.SpniPdfs.Remove(spniPdf);
            await _context.SaveChangesAsync();

            return true;
        }

        private bool SpniPdfExists(int id)
        {
            return _context.SpniPdfs.Any(e => e.Id == id);
        }
    }
}
