using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using SPNI.Interfaces;
using SPNI.Server.Data;
using SPNI.Server.DTO;
using SPNI.Server.Migrations;
using SPNI.Server.Model;

namespace SPNI.Server.Controllers
{
    [Authorize(Roles = "Admin,RajManger,User, Reader")]
    [Route("api/[controller]")]
    [ApiController]
    public class SpiAttitudesController(ApplicationDbContext context, IUser user, IWebHostEnvironment webHostEnvironment) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;
        private readonly IWebHostEnvironment _webHostEnvironment = webHostEnvironment;
        private readonly IUser _User = user;

        // GET: api/SpiAttitudes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SpiAttitudeDtoID>>> GetSpiAttitudes(bool Nch,int NYear,bool Mujmal)
        {
            int c = 0;
            IEnumerable<SpiAttitudeDtoID> x = [];
            if (NYear==0) NYear=DateTime.Now.Year;

            if (!Nch)
            {
                x = await (from s in _context.SpiAttitudes
                           join t in _context.Targets on s.TargetId equals t.Id
                           where !t.Moshtrak && s.Year== NYear && t.MainTarget
                           select new SpiAttitudeDtoID
                           {
                               Id = s.Id,
                               TargetId = s.TargetId,
                               PerentTargetId = t.PerentTargetId,
                               TargetName = t.Name??"",
                               TargetNameEn = t.NameEn ?? "",
                               OfficerInfoId = s.OfficerInfoId,
                               OfficerName = GetRankName(s.OfficerInfoId,_context)+" "+_context.OfficerInfos.Where(i => i.Id == s.OfficerInfoId).Select(i => i.Name).FirstOrDefault() ?? "",
                               ManageMinistryId = s.ManageMinistryId,
                               ManageMinistryName = _context.ManageMinistry.Where(i => i.Id == s.ManageMinistryId).Select(i => i.Name).FirstOrDefault() ?? "",
                               ActionTaken = s.ActionTaken,
                               ActionTakenEn= s.ActionTakenEn,
                               Follow = s.Follow,  
                               FollowEn= s.FollowEn,
                               Resolution = s.Resolution,
                               ResolutionEn= s.ResolutionEn,
                               Suggistion = s.Suggistion,
                               SuggistionEn= s.SuggistionEn,
                               Mujmal = s.Mujmal,
                               Year = s.Year,
                               IsTrue=s.IsTrue,
                               TargetSort = t.Sort,
                               TargetScorr = t.TargetScorr,
                               EndDateToComplete = s.EndDateToComplete,
                               StartDateToComplete = s.StartDateToComplete,
                               EndNotComplete = s.EndNotComplete,
                               IsComplete = s.IsComplete,
                               RateComplete = s.RateComplete,
                               SubSpiAttitude=GetSubSpiAttitude(s, Nch, NYear,  Mujmal,t.Id,  context).GetAwaiter().GetResult(),
                           }).ToListAsync();

            }
            else   
            {
                x = await (from s in _context.SpiAttitudes
                           join t in _context.Targets on s.TargetId equals t.Id
                           where t.Moshtrak && s.Year == NYear && s.Mujmal== Mujmal && t.MainTarget
                           select new SpiAttitudeDtoID
                           {
                               Id = s.Id,
                               TargetId = s.TargetId,
                               TargetName = t.Name??"",
                               TargetNameEn = t.NameEn ?? "",
                               PerentTargetId = t.PerentTargetId,
                               OfficerInfoId = s.OfficerInfoId,
                               OfficerName = GetRankName(s.OfficerInfoId, _context) + " " + _context.OfficerInfos.Where(i => i.Id == s.OfficerInfoId).Select(i => i.Name).FirstOrDefault() ?? "",
                               ManageMinistryId = s.ManageMinistryId,
                               ManageMinistryName = _context.ManageMinistry.Where(i => i.Id == s.ManageMinistryId).Select(i => i.Name).FirstOrDefault() ?? "",
                               ActionTaken = s.ActionTaken,
                               ActionTakenEn = s.ActionTakenEn,
                               Follow = s.Follow,
                               FollowEn = s.FollowEn,
                               Resolution = s.Resolution,
                               ResolutionEn = s.ResolutionEn,
                               Suggistion = s.Suggistion,
                               SuggistionEn = s.SuggistionEn,
                               Mujmal = s.Mujmal,
                               Year = s.Year,
                               IsTrue = s.IsTrue,
                               TargetSort = t.Sort,
                               TargetScorr = t.TargetScorr,
                               EndDateToComplete = s.EndDateToComplete,
                               StartDateToComplete = s.StartDateToComplete,
                               EndNotComplete = s.EndNotComplete,
                               IsComplete = s.IsComplete,
                               RateComplete = s.RateComplete,
                               SubSpiAttitude = GetSubSpiAttitude(s, Nch, NYear, Mujmal, t.Id, context).GetAwaiter().GetResult(),

                           }).OrderBy(i => i.TargetId).ToListAsync();
                if (Mujmal)
                {
                    x = x.DistinctBy(i => i.TargetId);

                    foreach (var item in x)
                    {
                         
                        var y= await (from a in _context.SpiAttitudes
                         join m in _context.ManageMinistry on a.ManageMinistryId equals m.Id
                        where a.TargetId == item.TargetId && a.Year== item.Year && !a.Mujmal
                         select m.Name
                         ).ToListAsync();

                        foreach(var SubItem in y)
                        item.ManageMinistryName += SubItem+"\n";

                    }
                }


            }

            
            foreach (var item in x)
            {
                item.Id1 = ++c;
            }
           
            return Ok(x);
        }

        private static async Task<List<SpiAttitudeDtoID>> GetSubSpiAttitude(SpiAttitude a,bool Nch, int NYear, bool Mujmal,int PerentTargetId, ApplicationDbContext context)
        {

           int c = 0;
            IEnumerable<SpiAttitudeDtoID> x = [];
            if (NYear == 0) NYear = DateTime.Now.Year;

            if (!Nch)
            {
                x = await(from s in context.SpiAttitudes
                          join t in context.Targets on s.TargetId equals t.Id
                          where !t.Moshtrak && s.Year == NYear && !t.MainTarget && t.PerentTargetId == PerentTargetId
                          select new SpiAttitudeDtoID
                          {
                              Id = s.Id,
                              TargetId = s.TargetId,
                              PerentTargetId = t.PerentTargetId,
                              TargetName = t.Name ?? "",
                              TargetNameEn = t.NameEn ?? "",
                              OfficerInfoId = s.OfficerInfoId,
                              OfficerName = GetRankName(s.OfficerInfoId, context) + " " + context.OfficerInfos.Where(i => i.Id == s.OfficerInfoId).Select(i => i.Name).FirstOrDefault() ?? "",
                              ManageMinistryId = s.ManageMinistryId,
                              ManageMinistryName = context.ManageMinistry.Where(i => i.Id == s.ManageMinistryId).Select(i => i.Name).FirstOrDefault() ?? "",
                              ActionTaken = s.ActionTaken,
                              ActionTakenEn = s.ActionTakenEn,
                              Follow = s.Follow,
                              FollowEn = s.FollowEn,
                              Resolution = s.Resolution,
                              ResolutionEn = s.ResolutionEn,
                              Suggistion = s.Suggistion,
                              SuggistionEn = s.SuggistionEn,
                              Mujmal = s.Mujmal,
                              Year = s.Year,
                              IsTrue = s.IsTrue,
                              TargetSort = t.Sort,
                              TargetScorr = t.TargetScorr,
                              EndDateToComplete = s.EndDateToComplete,
                              StartDateToComplete = s.StartDateToComplete,
                              EndNotComplete = s.EndNotComplete,
                              IsComplete = s.IsComplete,
                              RateComplete = s.RateComplete,
                               
                          }).ToListAsync();

            }
            else
            {
                x = await(from s in context.SpiAttitudes
                          join t in context.Targets on s.TargetId equals t.Id
                          where t.Moshtrak && s.Year == NYear && s.Mujmal == Mujmal && !t.MainTarget && t.PerentTargetId == PerentTargetId
                          select new SpiAttitudeDtoID
                          {
                              Id = s.Id,
                              TargetId = s.TargetId,
                              TargetName = t.Name ?? "",
                              TargetNameEn = t.NameEn ?? "",
                              PerentTargetId = t.PerentTargetId,
                              OfficerInfoId = s.OfficerInfoId,
                              OfficerName = GetRankName(s.OfficerInfoId, context) + " " + context.OfficerInfos.Where(i => i.Id == s.OfficerInfoId).Select(i => i.Name).FirstOrDefault() ?? "",
                              ManageMinistryId = s.ManageMinistryId,
                              ManageMinistryName = context.ManageMinistry.Where(i => i.Id == s.ManageMinistryId).Select(i => i.Name).FirstOrDefault() ?? "",
                              ActionTaken = s.ActionTaken,
                              ActionTakenEn = s.ActionTakenEn,
                              Follow = s.Follow,
                              FollowEn = s.FollowEn,
                              Resolution = s.Resolution,
                              ResolutionEn = s.ResolutionEn,
                              Suggistion = s.Suggistion,
                              SuggistionEn = s.SuggistionEn,
                              Mujmal = s.Mujmal,
                              Year = s.Year,
                              IsTrue = s.IsTrue,
                              TargetSort = t.Sort,
                              TargetScorr = t.TargetScorr,
                              EndDateToComplete = s.EndDateToComplete,
                              StartDateToComplete = s.StartDateToComplete,
                              EndNotComplete = s.EndNotComplete,
                              IsComplete = s.IsComplete,
                              RateComplete = s.RateComplete,
                          }).OrderBy(i => i.TargetId).ToListAsync();
                if (Mujmal)
                {
                    x = x.DistinctBy(i => i.TargetId);

                    foreach (var item in x)
                    {

                        var y = await (from spi in context.SpiAttitudes
                                       join m in context.ManageMinistry on spi.ManageMinistryId equals m.Id
                                       where spi.TargetId == item.TargetId && spi.Year == item.Year && !spi.Mujmal
                                       select m.Name
                         ).ToListAsync();

                        foreach (var SubItem in y)
                            item.ManageMinistryName += SubItem + "\n";

                    }
                }


            }


            foreach (var item in x)
            {
                item.Id1 = ++c;
            }

            return  x.ToList()  ;
        
        }

        private static string GetRankName(int officerInfoId, ApplicationDbContext context)
        {

             return  (from o in context.OfficerInfos
             join r in context.Ranks on o.RankId equals r.Id
             where o.Id == officerInfoId
             select r.Name).FirstOrDefault()??"";
            
        }







        // GET: api/SpiAttitudes/5
        [HttpPost("{id}")]
        public async Task<ActionResult<SpiAttitude>> GetSpiAttitude(int id)
        {
            var spiAttitude = await _context.SpiAttitudes.FindAsync(id);

            if (spiAttitude == null)
            {
                return NotFound();
            }

            return spiAttitude;
        }

        // PUT: api/SpiAttitudes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> PutSpiAttitude(int id, SpiAttitudeDto spiAttitudeDto)
        {
            var x = _context.SpiAttitudes.Find(id);
            if(x == null)
            {
                return false;
            }

            x.ActionTaken=spiAttitudeDto.ActionTaken;
            x.ActionTakenEn=spiAttitudeDto.ActionTakenEn;
            x.Follow=spiAttitudeDto.Follow;
            x.FollowEn = spiAttitudeDto.FollowEn;
            x.Resolution=spiAttitudeDto.Resolution;
            x.ResolutionEn=spiAttitudeDto.ResolutionEn;
            x.Suggistion=spiAttitudeDto.Suggistion;
            x.SuggistionEn=spiAttitudeDto.SuggistionEn;
            x.ManageMinistryId = spiAttitudeDto.ManageMinistryId;
            x.TargetId=spiAttitudeDto.TargetId;
            x.OfficerInfoId=spiAttitudeDto.OfficerInfoId;
            x.FullDate = DateTime.Now;
            x.Day = DateTime.Now.Day;
            x.Month = DateTime.Now.Month;
            x.Year = spiAttitudeDto.Year;
            x.IsTrue = false;
            x.StartDateToComplete = spiAttitudeDto.StartDateToComplete;
            x.EndDateToComplete = spiAttitudeDto.EndDateToComplete;
            x.EndNotComplete = DateTime.Now < spiAttitudeDto.EndDateToComplete ? false : true;
            x.IsComplete = spiAttitudeDto.IsComplete;
            x.RateComplete = spiAttitudeDto.RateComplete;

            _context.SpiAttitudes.Update(x);
            if (await _context.SaveChangesAsync() > 0)
            {
                if (!x.Mujmal && _context.Targets.Where(i => i.Id == x.TargetId).Select(i => i.Moshtrak).First())
                {
                    if (await AddMuhmal(x ))
                    {
                        return true;
                    }
                    return BadRequest();
                }
                return true;
            }
            return BadRequest(spiAttitudeDto);
        }

        // POST: api/SpiAttitudes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<bool>> PostSpiAttitude(SpiAttitudeDto spiAttitudeDto)
        {
            SpiAttitude spiAttitude = new()
            {

                ActionTaken = spiAttitudeDto.ActionTaken,
                ActionTakenEn = spiAttitudeDto.ActionTakenEn,
                Follow = spiAttitudeDto.Follow,
                FollowEn = spiAttitudeDto.FollowEn,
                Resolution = spiAttitudeDto.Resolution,
                ResolutionEn = spiAttitudeDto.ResolutionEn,
                OfficerInfoId = spiAttitudeDto.OfficerInfoId,
                Suggistion = spiAttitudeDto.Suggistion,
                SuggistionEn = spiAttitudeDto.SuggistionEn,
                ManageMinistryId = spiAttitudeDto.ManageMinistryId,
                TargetId = spiAttitudeDto.TargetId,
                FullDate = DateTime.Now,
                Day = DateTime.Now.Day,
                Month = DateTime.Now.Month,
                Year = spiAttitudeDto.Year,
                IsTrue = false,
                Mujmal = false,
                StartDateToComplete = spiAttitudeDto.StartDateToComplete ,
                EndDateToComplete = spiAttitudeDto.EndDateToComplete,
                EndNotComplete = DateTime.Now < spiAttitudeDto.EndDateToComplete ? false : true,
                IsComplete = spiAttitudeDto.IsComplete,
                RateComplete = spiAttitudeDto.RateComplete,
               
            };



            if (_context.Targets.Where(i => i.Id == spiAttitude.TargetId).Select(i => i.Moshtrak).First())
            {


                _context.SpiAttitudes.Add(spiAttitude);
                if (await _context.SaveChangesAsync() > 0)
                {
                    if (_context.Targets.Where(i => i.Id == spiAttitude.TargetId).Select(i => i.Moshtrak).First())
                    {
                        if (await AddMuhmal(spiAttitude))
                        {
                            return Ok();
                        }
                        return BadRequest();
                    }

                    return Ok();


                }
            }
            else
            {
                if (_context.SpiAttitudes.Any(i => i.TargetId == spiAttitude.TargetId && i.Year == spiAttitude.Year))
                {
                    return false;
                }
                else
                {
                    _context.SpiAttitudes.Add(spiAttitude);
                    return   await _context.SaveChangesAsync()>0;
                   
                }

                
            }
            return Ok();
        }

        private async Task<bool> AddMuhmal(SpiAttitude spiAttitude)
        {

            if (!_context.SpiAttitudes.Any(
                i => i.TargetId == spiAttitude.TargetId
                       && i.Year == spiAttitude.Year
                       && i.Mujmal))
            {
                SpiAttitude spiAttitude1 = new()
                {
                    TargetId = spiAttitude.TargetId,
                    ManageMinistryId = 0,
                    Day = DateTime.Now.Day,
                    Month = DateTime.Now.Month,
                    Year = spiAttitude.Year,
                    FullDate = spiAttitude.FullDate,
                    OfficerInfoId = spiAttitude.OfficerInfoId,
                    Mujmal = true

                };
                AllStrings strings = await GetAllStrings(spiAttitude, false);

                spiAttitude1.Follow = strings.Follows;
                spiAttitude1.FollowEn = strings.FollowsEn;
                spiAttitude1.ActionTaken = strings.ActionTakens;
                spiAttitude1.ActionTakenEn = strings.ActionTakensEn;
                spiAttitude1.Resolution = strings.Resolutions;
                spiAttitude1.ResolutionEn = strings.ResolutionsEn;
                spiAttitude1.Suggistion = strings.Suggistions;
                spiAttitude1.SuggistionEn = strings.SuggistionsEn;

                
                _context.SpiAttitudes.Add(spiAttitude1);
                if (await _context.SaveChangesAsync() > 0)
                {
                    return true;

                }

                _context.SpiAttitudes.Remove(spiAttitude1);
                await _context.SaveChangesAsync();
                return false;

            }
            else
            {
                var x = await _context.SpiAttitudes.Where(
                  i => i.TargetId == spiAttitude.TargetId
                         && i.Year == spiAttitude.Year
                         && i.Mujmal).FirstAsync();

                AllStrings strings = await GetAllStrings(x, false);

                x.Follow = strings.Follows;
                x.ActionTaken = strings.ActionTakens;
                x.Resolution = strings.Resolutions;
                x.Suggistion = strings.Suggistions;
                _context.SpiAttitudes.Update(x);
                if(await _context.SaveChangesAsync() > 0)
                     return true; 

                return false;
            }
                 
            

        }

      
        private class AllStrings
        {
            public string Follows { get; set; } = string.Empty;
            public string ActionTakens { get; set; } = string.Empty;
            public string Suggistions { get; set; } = string.Empty;
            public string Resolutions { get; set; } = string.Empty;
         
            public string FollowsEn { get; set; } = string.Empty;
       
            public string ActionTakensEn { get; set; } = string.Empty;
 
            public string SuggistionsEn { get; set; } = string.Empty;
         
            public string ResolutionsEn { get; set; } = string.Empty;
        }
        private async Task<AllStrings> GetAllStrings(SpiAttitude spiAttitude,bool Mujmal)
        {
            AllStrings strings = new();
            List<AllStrings> stringsList = [];
            if (!Mujmal)
            {
                stringsList = await (from i in _context.SpiAttitudes

                                     where i.TargetId == spiAttitude.TargetId
                                      && i.Year == spiAttitude.Year
                                      && i.Mujmal == Mujmal
                                     select new AllStrings
                                     {
                                         Follows = i.Follow,
                                         FollowsEn = i.FollowEn,
                                         ActionTakens = i.ActionTaken,
                                         ActionTakensEn = i.ActionTakenEn,
                                         Resolutions = i.Resolution,
                                         ResolutionsEn = i.ResolutionEn,
                                         Suggistions = i.Suggistion,
                                         SuggistionsEn = i.SuggistionEn

                                     }).ToListAsync();
            }
            else
            {
                stringsList = await (from i in _context.SpiAttitudes

                                     where i.TargetId == spiAttitude.TargetId
                                      && i.Year == spiAttitude.Year
                                      && i.Month == spiAttitude.Month
                                      && i.Day == spiAttitude.Day
                                     
                                     select new AllStrings
                                     {
                                         Follows = i.Follow,
                                         FollowsEn = i.FollowEn,
                                         ActionTakens = i.ActionTaken,
                                         ActionTakensEn = i.ActionTakenEn,
                                         Resolutions = i.Resolution,
                                         ResolutionsEn = i.ResolutionEn,
                                         Suggistions = i.Suggistion,
                                         SuggistionsEn = i.SuggistionEn

                                     }).ToListAsync();
            }
                foreach (var item in stringsList)
                {
                    if (!string.IsNullOrEmpty(item.Follows))
                        strings.Follows += item.Follows + "\n";

                    if (!string.IsNullOrEmpty(item.ActionTakens))
                        strings.ActionTakens += item.ActionTakens + "\n";

                    if (!string.IsNullOrEmpty(item.Resolutions))
                        strings.Resolutions += item.Resolutions + "\n";

                    if (!string.IsNullOrEmpty(item.Suggistions))
                        strings.Suggistions += item.Suggistions + "\n";

                if (!string.IsNullOrEmpty(item.FollowsEn))
                    strings.FollowsEn += item.FollowsEn + "\n";

                if (!string.IsNullOrEmpty(item.ActionTakensEn))
                    strings.ActionTakensEn += item.ActionTakensEn + "\n";

                if (!string.IsNullOrEmpty(item.ResolutionsEn))
                    strings.ResolutionsEn += item.ResolutionsEn + "\n";

                if (!string.IsNullOrEmpty(item.SuggistionsEn))
                    strings.SuggistionsEn += item.SuggistionsEn + "\n";
            }
             
            return strings;

        }

        // DELETE: api/SpiAttitudes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpiAttitude(int id)
        {
            var spiAttitude = await _context.SpiAttitudes.FindAsync(id);
            if (spiAttitude == null)
            {
                return NotFound();
            }
            try
            {
                _context.SpiAttitudes.Remove(spiAttitude);
                if (await _context.SaveChangesAsync() > 0)
                {
                    var m =await _context.Targets.Where(i=>i.Id == spiAttitude.TargetId).FirstAsync();
                    if (m.Moshtrak)
                    {

                        var x = (from a in _context.SpiAttitudes
                                 where a.TargetId == m.Id && !a.Mujmal && a.Year == spiAttitude.Year
                                 select a).FirstOrDefault();

                        if (x != null)
                        {
                            if (await AddMuhmal(spiAttitude))
                            {
                                return Ok();
                            }
                            return BadRequest();
                        }
                        else
                        {
                            var S = await _context.SpiAttitudes.Where(i => i.TargetId == m.Id && i.Year == spiAttitude.Year && i.Mujmal).ToListAsync();
                            if (S.Count > 0)
                            {
                                _context.SpiAttitudes.RemoveRange(S);
                                await _context.SaveChangesAsync();
                            }

                        }
                    }

                    return Ok();
                }

                return BadRequest();
            }
            catch
            {
                return BadRequest();
            }
        }

        private bool SpiAttitudeExists(int id)
        {
            return _context.SpiAttitudes.Any(e => e.Id == id);
        }


        [HttpGet]
        [Route("GetTargetList")]
        public async Task<List<TargetList>> GetTargetList(int MinistaryId, int Nyear ,bool edit , bool typeTagret)
        {
            List<TargetList> x = [];
            List<int> ints2 = [];
            List<int> ints3 = [];
            IEnumerable<int> ints = [];
            //جلب جميع الاهداف المخصة لهذه الوحدة
            IEnumerable<int> TargetsIds = _context.TargetManageMinistries.Where(i => i.ManageMinistryId == MinistaryId).Select(i => i.TargetId);
            //الاهداف المدامة لهذه الوحدو في هذه السنة يجب عدم جلبها
             ints = _context.SpiAttitudes.Where(i => i.ManageMinistryId == MinistaryId && i.Year == Nyear).Select(i => i.TargetId);
            if (typeTagret)
            {
          
            if (!edit)
            {
                x = await (from t in _context.Targets
                           where TargetsIds.Any(i => i == t.Id)
                           && !ints.Any(i => i == t.Id)
                           select new TargetList
                           {
                               Label = t.Name,
                               Value = t.Id
                           }).ToListAsync();

            }
            else
            {
                x = await (from t in _context.Targets
                           where TargetsIds.Any(i => i == t.Id)
                        
                           select new TargetList
                           {
                               Label = t.Name,
                               Value = t.Id
                           }).ToListAsync();
            }

            }
            else
            {
                ints2 = (from s in _context.SpiAttitudes
                        join t in _context.Targets on s.TargetId equals t.Id
                        where s.ManageMinistryId == MinistaryId && s.Year == Nyear && t.MainTarget
                        select s.TargetId
                         ).ToList();

                if (!edit)
                {
                    ints3.AddRange(ints2);
                    foreach (var item in ints3)
                    {
                        var subtarget = await _context.Targets.Where(i => i.PerentTargetId == item && !i.MainTarget).Select(i => i.Id).ToListAsync();

                        foreach (var item2 in subtarget)
                        {
                            if (!_context.SpiAttitudes.Any(i => i.TargetId == item2)) 
                            {
                                  ints2.Remove(item);
                            }
                        }
                    }
                    ints = ints2;
                    try
                    {

                  
                    x = await (from t in _context.Targets
                               where TargetsIds.Any(i => i == t.Id)
                               && !ints.Equals(  t.Id)
                               select new TargetList
                               {
                                   Label = t.Name,
                                   Value = t.Id
                               }).ToListAsync();
                    }
                    catch (Exception e)
                    {

                    }

                }
                else
                {
                    x = await (from t in _context.Targets
                               where TargetsIds.Any(i => i == t.Id)

                               select new TargetList
                               {
                                   Label = t.Name,
                                   Value = t.Id
                               }).ToListAsync();
                }


            }
            return (x);
            
        }


        [HttpGet]
        [Route("GetOfficerList")]
        public async Task<List<OfficerList>> GetOfficerList()
        {

            List<OfficerList> x = await (from m in _context.OfficerInfos

                                         select new OfficerList
                                         {
                                             Label = m.Name ?? "",
                                             Value = m.Id,

                                         }).ToListAsync();



            return (x);

        }

        [HttpGet]
        [Route("GetManageMinistryListWithUser")]
        public async Task<List<ManageMinistryList>> GetManageMinistryListWithUser()
        {
            string UserId = await _User.GetCurrentUserId();
            IList<int> ints = [];
            ints = [.. _context.ApplicationUserManageMinistries.Where(i => i.ApplicationUserId == UserId).Select(i => i.ManageMinistryId)];


            if (User.IsInRole("AllUnits"))
                return await (

                                                    from m in _context.ManageMinistry

                                                    select new ManageMinistryList
                                                    {
                                                        Label = m.Name ?? "",
                                                        Value = m.Id,

                                                    }).ToListAsync();


            var x = await (

                                                 from m in _context.ManageMinistry
                                                 join mm in _context.ApplicationUserManageMinistries.Where(i => i.ApplicationUserId == UserId) on m.Id equals mm.ManageMinistryId
                                                 select new ManageMinistryList
                                                 {
                                                     Label = m.Name ?? "",
                                                     Value = m.Id,

                                                 }).ToListAsync();


            return (x);
        }


    

        [HttpGet]
        [Route("GetYearList")]
        public async Task<List<YearList>> GetYearList(bool Nch)
        {if(Nch)
            {
                  return await(from t in _context.Targets
                         where t.Year!=0 && t.Moshtrak== Nch
                      select new YearList
                      {
                          Value=t.Year, Label=t.Year.ToString() ,
                      }).Distinct().ToListAsync(); 
            }else  {
                return await (from t in _context.Targets
                              where t.Year != 0 && t.Moshtrak == false
                              select new YearList
                              {
                                  Value = t.Year,
                                  Label = t.Year.ToString(),
                              }).Distinct().ToListAsync();
            }
     
           
        }

        [HttpGet]
        [Route("GetYearAllList")]
        public List<YearList> GetYearAllList()
        {
              var x = DateTime.Now.Year;

            List<YearList> yearLists = [];

              for (int s = 1; s <= 5; s++)
            {
                yearLists.Add(new()
                {
                    Value = x-s,
                     Label = (x-s).ToString(),
                });
            }
            yearLists.Add(new()
            {
                Value = DateTime.Now.Year,
                Label = DateTime.Now.Year.ToString(),
            });
            for (int s = 1; s <= 5; s++)
            {
                yearLists.Add(new()
                {
                    Value = x + s,
                    Label = (x + s).ToString(),
                });
            }
          return  [..yearLists.OrderBy(i=>i.Value)]; 
        }


        [HttpGet]
        [Route("GetTargetScorr")]
        public async Task<int> GetTargetScorr(int id)
        {
            return await _context.Targets.Where(i=>i.Id == id).Select(i=>i.TargetScorr).FirstOrDefaultAsync();
        }

        [HttpPost]
        [Route("Truth")]
        public async Task<ActionResult> Truth(int Id,bool IsTrue)
        {
            SpiAttitude? spiAttitude =await _context.SpiAttitudes.FindAsync(Id);
            if (spiAttitude == null)
                return BadRequest(ModelState);
            try
            {
                spiAttitude.IsTrue = IsTrue;
                _context.SpiAttitudes.Update(spiAttitude);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest(ModelState);
            }
        }

        [HttpGet]
        [Route("GetSubTarget")]
        public async Task<List<TargetList>> GetSubTarget(int Year, int Mid, int Tid,bool TypeTagret, bool Edit)
        {
            List<TargetList> targets = [];
            if (Mid != 0 && Tid != 0 &&!TypeTagret)
            {
                //1 //جلب ارقام الاهداف الفرعية تحت هذا الهدف الرئيسي

                IEnumerable<int> AllSubTargets = _context.Targets
                    .Where(i => i.PerentTargetId == Tid && !i.MainTarget && i.Active)
                    .Select(i => i.Id);



                //2 //جلب ارقام الاهداف الفرعية الموجودة في الخطة لهذه الوحدة ولهذه السنة وموجودة ضمن فقرة 1

                IEnumerable<int> AllSubTargetsInAttitude = (from s in _context.SpiAttitudes

                                                            where s.ManageMinistryId == Mid
                                                            && s.Year == Year
                                                            && AllSubTargets.Any(i => i == s.TargetId)
                                                            select s.TargetId);



                /* //3// 
                اذا كان اضافة جديد
                جلب الاهداف ما عدى الموجود في فقرة 2

               اذا كان تعديل 
               جلب الاهداف في الفقرة 1
                */

                if (!Edit)
                {
                    targets = await (from t in _context.Targets
                                     where !t.MainTarget && t.Active && t.PerentTargetId == Tid
                                     && !AllSubTargetsInAttitude.Any(i => i == t.Id)
                                     orderby t.Sort
                                     select new TargetList
                                     {
                                         Label = t.Name,
                                         Value = t.Id
                                     }).ToListAsync();

                }

                else
                {
                    targets = await (from t in _context.Targets
                                     where !t.MainTarget && t.Active && t.PerentTargetId == Tid
                                     // && !AllSubTargetsInAttitude.Any(i => i == t.Id)
                                     orderby t.Sort
                                     select new TargetList
                                     {
                                         Label = t.Name,
                                         Value = t.Id
                                     }).ToListAsync();
                }
            }
            return targets;
        }
    }
}
