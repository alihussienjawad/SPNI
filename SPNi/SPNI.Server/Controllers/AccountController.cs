using ArgosTranslate.PyNet.PyInstallers;
using Humanizer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using SPNI.Interfaces;
using SPNI.Server;
using SPNI.Server.Data;
using SPNI.Server.DTO;
using SPNI.Server.Model;
using System;
using System.Security.Claims;

namespace ReactAuthSystem.Server.Controllers
{
    [Authorize(Roles = "Admin,Manager")]
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController(IUser user, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, ApplicationDbContext context ) : ControllerBase
    {
        private readonly IUser _User = user;
        private readonly SignInManager<ApplicationUser> _signInManager = signInManager;
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly ApplicationDbContext _context = context;





        [AllowAnonymous]
        [HttpPut("{id}")]
        public async  Task<bool> PutUser( string id,RegisterUserDto dto)
        {
             

            return await _User.UpdateUserAsync(id, dto);
        }

        [AllowAnonymous]
        [HttpPost("LockInOut/{id}")]
        public async Task<bool> LockInOut(string? id)
        {
            if(!string.IsNullOrEmpty(id))
            return await _User.LockInOutAsync(id);
            return false;
        }


        [AllowAnonymous]
        [HttpPost("ResetPassword/{id}")]
        public async Task<bool> ResetPassword(string? id)
        {
            if (!string.IsNullOrEmpty(id))
                return await _User.SetPasswordAsync(id);
            return false;
        }
        [AllowAnonymous]
        [HttpPost("PasswordNew")]
        public async Task<bool> PasswordNew(resetPass resPass )
        {

            return await _User.SetPasswordNewAsync(resPass );
             
        }
        // DELETE: api/accunt/5
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteUsers(string id)
        {
            var users = await _context.ApplicationUser.FindAsync(id);
            if (users == null)
            {
                return false;
            }

            _context.ApplicationUser.Remove(users);
            await _context.SaveChangesAsync();

            return true;
        }

      

    [AllowAnonymous]
        [HttpGet("GetAllUser")]
         
        public async Task<List<ApplicationUser>> GetAllUser()
        {
            var x =   await(  from a in _context.ApplicationUser 
                         
                            select new  ApplicationUser
                           {
                              Id= a.Id, 
                              RankName = _context.Ranks.Where(i => i.Id == a.RankId).Select(i => i.Name).FirstOrDefault() ?? "",
                              RankId = a.RankId,
                              UnitName = _context.Units.Where(i => i.Ur_no == a.ur_no).Select(i => i.Name).FirstOrDefault() ?? "",
                              PersonName = a.PersonName,
                              Email = a.Email,
                              ur_no = a.ur_no,
                              PersonNo = a.PersonNo,
                              LockoutEnabled = a.LockoutEnabled,
                              LockoutEnd =a.LockoutEnd,
                              NormalizedEmail = a.NormalizedEmail,
                              NormalizedUserName = a.NormalizedUserName,
                              UserName = a.UserName,
                              Password = a.Password,
                              PasswordHash = a.PasswordHash,
                              PersonPosition = a.PersonPosition,
                              PhoneNumber = a.PhoneNumber,
                              User_state = a.User_state,
                              ClosedAccountFlag = a.ClosedAccountFlag,
                              ClosedBy = _context.ApplicationUser.Where(i => i.Id == a.ClosedBy!).Select(i => i.PersonName).FirstOrDefault() ?? "",
                              Cisco = a.Cisco,
                             PassChange = a.PassChange,
                             AccessFailedCount = a.AccessFailedCount,
                             RefreshTokenExpiryTime = a.RefreshTokenExpiryTime,
                             RefreshToken=a.RefreshToken,
                             Created_date=a.Created_date,
                             Created_by= _context.ApplicationUser.Where(i => i.Id == a.Created_by!).Select(i => i.PersonName).FirstOrDefault() ?? "",
                             Updated_by= _context.ApplicationUser.Where(i=> i.Id == a.Updated_by!).Select(i=>i.PersonName).FirstOrDefault()??"",
                             Updated_date=a.Updated_date,
                             UnitUser=_context.ApplicationUserManageMinistries.Where(i=>i.ApplicationUserId == a.Id).Select(i => i.ManageMinistryId).ToList()
                           }
                           ).ToListAsync();
            return x;
        }

        [AllowAnonymous]
        [HttpGet("GetAllRole")]
        public async Task<List<RoleDto>> GetAllRole(string? userId)
        {
            
          

            List<RoleDto> x = [];
            if (string.IsNullOrEmpty(userId))
            {
                  x = await ( from a in _context.ApplicationRoles
                                            select new RoleDto
                                            {
                                                roleId = a.Id,
                                                roleName =a.Name??"",
                                                roleNameAR =a.RoleNameAR ,
                                                isSelected = false
                                            }).ToListAsync();
                 

            }

            else
            {
                IEnumerable<string> Roles = [];
                var user = await _context.ApplicationUser.FindAsync(userId);
                if (user is not null)
                {
                    Roles = await _userManager.GetRolesAsync(user);
                    x = await (from a in _context.ApplicationRoles
                               select new RoleDto
                               {
                                   roleId = a.Id,
                                   roleName = a.Name ?? "",
                                   roleNameAR = a.RoleNameAR,
                                   isSelected =GetUserInRole(Roles,a.Name)
                               }).ToListAsync();
                   
                }

              
            }

            return x;

        }

        private static bool GetUserInRole(IEnumerable<string> roles, string? name)
        {
            return roles.Any(i => i == name);
        }



        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<bool>>RegisterUser(RegisterUserDto dto)
        {
              return Ok(await _User.CreateUserAsync(dto));
        }



        [AllowAnonymous]
        [HttpPost("logout")]
        public async Task<ActionResult<bool>> Logout()
        {
             await _signInManager.SignOutAsync();
            return true;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]  LoginDto dto)
        {
            
            var result= await _User.LoginAsync(dto);

         
                if (!string.IsNullOrEmpty(result.Message))
                {
                    return Ok(result);
                }
                return BadRequest(result.Message);

        
            
        }


  

        [AllowAnonymous]
        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest model)
        {
            try
            {
                 
                var newToken = await _User.RefreshTokenAsync(model);
                return Ok(new { token = newToken });
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
           
        }
 

       


        [HttpGet("reader")]
        [Authorize(Roles = "Reader")]
        public ActionResult<string> GetReader()
        {
            return Ok("Reader Role");
        }
        [AllowAnonymous]
        [HttpGet("GetAllRanks")]

        public async Task<ActionResult<List<RankList>>> GetAllRanks()
        {
          var x= await (from r in _context.Ranks
                      select new RankList { 
                      
                      Label = r.Name,
                      Value=r.Id

                      }).ToListAsync();
            if (x.Count>0) 
            return Ok(x);

            return BadRequest(x);
        }

        [AllowAnonymous]
        [HttpGet("GetSpiAutoComplete")]
        public async Task<ActionResult< List<SpiUnitAutoComplete>>> GetSpiAutoComplete()
        {



            List<SpiUnitAutoComplete> x = await (from m in _context.Units
                                                        where m.Ur_no > 0
                                                        select new SpiUnitAutoComplete
                                                        {
                                                            Key = m.Ur_no,
                                                            Value = m.Name ?? "",

                                                        }).ToListAsync();

            return (x);

        }
        [HttpGet]
        [Route("GetManageMinistryList")]
        public async Task<List<ManageMinistryList>> GetManageMinistryList()
        {

            return await (

                                                from m in _context.ManageMinistry

                                                select new ManageMinistryList
                                                {
                                                    Label = m.Name ?? "",
                                                    Value = m.Id,

                                                }).ToListAsync();


        }
    }
}
