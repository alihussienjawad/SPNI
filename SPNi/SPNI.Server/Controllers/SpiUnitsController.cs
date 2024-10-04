using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SPNI.Server.Data;
using SPNI.Server.DTO;
using SPNI.Server.Model;

namespace SPNI.Server.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]

    
    [ApiController]
    public class SpiUnitsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
       
        public SpiUnitsController(ApplicationDbContext context)
        {
            _context = context;
           
        }

        // GET: api/SpiUnits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpiUnitDTOGet>>> GetSpiUnits()
        {
             

          var x= await (from u in _context.Units
                          join s in _context.SpiUnits on u.Ur_no equals s.Ur_no


                          select new SpiUnitDTOGet
                          {

                          
                              Id = s.Id,
                              Ur_no = u.Ur_no,
                              Name = u.Name??"",
                              NameEn = s.NameEn??"",
                              Sort = s.Sort,
                              BgColor =s.BgColor,
                              Color=s.Color,
                              CanAdd=s.CanAdd,
                              Active = s.Active,
 
                          }).OrderBy(i => i.Sort).ToListAsync();
            
            return x;
        }

      

        // GET: api/SpiUnits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SpiUnit>> GetSpiUnit(int id)
        {
            var spiUnit = await _context.SpiUnits.FindAsync(id);

            if (spiUnit == null)
            {
                return NotFound();
            }

            return spiUnit;
        }

        // PUT: api/SpiUnits/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<bool> PutSpiUnit(int id, [FromBody]  SpiUnitDTO spiUnitdTO)
        {
             var sen = _context.SpiUnits.Find(id);
            if (sen == null)
                return false;

            sen.Active = spiUnitdTO.Active;
            sen.BgColor = spiUnitdTO.BgColor;
            sen.CanAdd = spiUnitdTO.CanAdd;
            sen.Color = spiUnitdTO.Color;
            sen.Sort = spiUnitdTO.Sort;
            sen.Ur_no = spiUnitdTO.Ur_no;
            sen.NameEn = spiUnitdTO.NameEn;
           

            _context.SpiUnits.Update(sen);
           return   await _context.SaveChangesAsync()>0;
            
        }

        // POST: api/SpiUnits
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<bool>> PostSpiUnit(SpiUnitDTO spiUnitdTO)
        {
            SpiUnit spiUnit = new()
            {
                Id = _context.SpiUnits.Any() ? _context.SpiUnits.Max(i => i.Id) + 100 : 1000,
                Active = spiUnitdTO.Active,
                BgColor = spiUnitdTO.BgColor,
                CanAdd = spiUnitdTO.CanAdd,
                Color = spiUnitdTO.Color,
                Sort = spiUnitdTO.Sort,
                Ur_no = spiUnitdTO.Ur_no,
                NameEn = spiUnitdTO.NameEn,
            };
            _context.SpiUnits.Add(spiUnit);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SpiUnitExists(spiUnit.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
            
            return Ok();
        }

        // DELETE: api/SpiUnits/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpiUnit(int id)
        {
            var spiUnit = await _context.SpiUnits.FindAsync(id);
            if (spiUnit == null)
            {
                return NotFound();
            }

            _context.SpiUnits.Remove(spiUnit);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool SpiUnitExists(int id)
        {
            return _context.SpiUnits.Any(e => e.Id == id);
        }

        [HttpGet]
        [Route("GetSpiAutoComplete")]
        public async Task<IEnumerable<SpiUnitAutoComplete>> GetSpiAutoComplete()
        {


            IEnumerable<int> ints = _context.SpiUnits.Select(b => b.Ur_no); 
            List< SpiUnitAutoComplete> x = await (from m in _context.Units
                                            where !ints.Contains(m.Ur_no) && m.Ur_no >0
                                                  select new SpiUnitAutoComplete
                          {
                              Key = m.Ur_no,
                              Value = m.Name??"",
                              ValueEn = _context.SpiUnits.Where(b => b.Ur_no==m.Ur_no).Select(b => b.NameEn).FirstOrDefault() ?? "",

                          }).ToListAsync();

            return (x);

        }
 


        [HttpGet]
        [Route("GetTargetsList")]
        public async Task<List<TargetList>> GetTargetsList()
        {

            return await (

                                                from m in _context.Targets

                                                select new TargetList
                                                {
                                                    Label = m.Name ?? "",
                                                    LabelEn = m.NameEn ?? "",
                                                    Value = m.Id,

                                                }).ToListAsync();


        }
    }
}
