
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SPNI.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using SPNI.Server.DTO;
using SPNI.Server.Model;
using SPNI.Server.Data;
using Microsoft.JSInterop.Infrastructure;
using NuGet.Common;



namespace SPNI.Services
{
    public class UserService : IUser
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration config;
        private readonly JWT _jwt;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration config,
             IOptions<JWT> jwt,
             IHttpContextAccessor httpContextAccessor

            )
        {
            _context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.config = config;
            _jwt = jwt.Value;
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<string> GetCurrentUserId()
        {
           var x=  _httpContextAccessor?.HttpContext?.Request.Headers.Authorization.ToString().Split(' ')[1];
            if (!string.IsNullOrEmpty(x))
            {
                var principal = GetPrincipalFromExpiredToken(x);
                if (principal != null)
                {
                    var username = principal.Identity?.Name??"";
                    var user=await userManager.FindByEmailAsync(username);
                    if (user != null)
                      return user.Id ?? "";

                   
                }
               
            }
            return "";
        }




        public async Task<bool> CreateUserAsync(RegisterUserDto dto)
        {
            
            List<string> rolesNeed = dto.RoleWithUserDto.Where(i => i.isSelected).Select(i => i.roleName).ToList();

          
            ApplicationUser applicationUser = new()
            {
                PersonName = dto.PersonName,
                PersonNo = dto.PersonNo,
                RankId = dto.RankId,
                Email = dto.Email,
                PersonPosition = dto.PersonPosition,
                Cisco = dto.Cisco,
                HrTest = dto.HrTest,
                ur_no = dto.Ur_no,
                Created_date = DateTime.UtcNow,
                Created_by = GetCurrentUserId().GetAwaiter().GetResult(),
                Updated_date = DateTime.UtcNow,
                Updated_by =string.Empty,
                Password = Encrypt("Password1"),
                RefreshToken = string.Empty,
        };

         
            try
            {

            
                await userManager.SetEmailAsync(applicationUser, dto.Email);
                await userManager.SetUserNameAsync(applicationUser, dto.Email);

                var res = await userManager.CreateAsync(applicationUser, "Apex_1234");
                if (res.Succeeded)
                {
                    var user=await userManager.FindByEmailAsync(dto.Email);


                    if (user != null)
                    {
                        List<ApplicationUserManageMinistry> M = [];
                        M=_context.ApplicationUserManageMinistries.Where(i=>i.ApplicationUserId==user.Id).ToList();
                        if (M.Count != 0) {
                            _context.ApplicationUserManageMinistries.RemoveRange(M);
                            await _context.SaveChangesAsync();
                            M = [];
                        }

                       
                        foreach (var item in dto.UnitUser) {
                            M.Add(new() { ApplicationUserId = user.Id, ManageMinistryId = item });
                        }
                        _context.ApplicationUserManageMinistries.AddRange(M);
                        await _context.SaveChangesAsync();


                       var set= SetPasswordAsync(user.Id);
                       var result=  await userManager.AddToRolesAsync(applicationUser!, rolesNeed);
                       return result.Succeeded;
                    
                    }
                   
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        public async Task<LoginResponse> LoginAsync([FromBody] LoginDto dto)
        {
            LoginResponse loginResponse = new();
            var result = await signInManager.PasswordSignInAsync(
                  dto.Email!, dto.Password!, dto.RememberMe,false);

            if (result.Succeeded)
            {
                var user = await userManager.FindByEmailAsync(dto.Email);
               if(user == null)
                    return new() { Message = "Error In Login" };

                IList<string> Roles = await userManager.GetRolesAsync(user!);
                var jwtSecurityToken = await GenerateJwtToken(user!);

                user.RefreshToken = GenerateRefreshToken();
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(5); // Refresh token valid for 5 days
                await userManager.UpdateAsync(user);

                loginResponse.passwordChange = user.PassChange ;
                loginResponse.BasicUserInfo=new();
                loginResponse.UserRoles = [.. Roles];
                loginResponse.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                loginResponse.Expiration = jwtSecurityToken.ValidTo;
                loginResponse.Refresh_token = user.RefreshToken;
                loginResponse.Refresh_token_expiry = user.RefreshTokenExpiryTime;
                loginResponse.LoginStatus =true;
                loginResponse.Message = "Login Success";
                return loginResponse;
            }
            return new() { Message = "Error In Login" };
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private async Task<JwtSecurityToken> GenerateJwtToken(ApplicationUser user)
        {

            IList<string> Roles = await userManager.GetRolesAsync(user!);
           // UserSession userSession = new(user.Id, user.UserName, user.Email, [.. Roles]);
          
            List<Claim> userClaims = [];


        
         
            userClaims.Add(new Claim(ClaimTypes.Email, user.Email!));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.UserName??""));
            userClaims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
            userClaims.Add(new Claim(ClaimTypes.Name, user.UserName!));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            userClaims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email??""));
            userClaims.Add(new Claim("rol", "api_access"));

            if (Roles is not null)
                foreach (var item in Roles)
                {
                    userClaims.Add(new Claim(ClaimTypes.Role, item));

                }


            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwt.Issuer,
                audience: _jwt.Audience,
                claims: userClaims,
                expires: DateTime.UtcNow.AddMinutes(_jwt.DurationInMinutes),
                signingCredentials: signingCredentials
             
                );
           
            return jwtSecurityToken;
        }
        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.Key)),
                ValidateLifetime = false // No need to validate lifetime since it's handled in JWT middleware
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;
        }


        public async Task<string> RefreshTokenAsync([FromBody]  RefreshTokenRequest model)
        {
        

            var principal = GetPrincipalFromExpiredToken(model.Token);
            var username = principal.Identity?.Name; // retrieve the username from the expired token

            var user = await userManager.FindByNameAsync(username!);

            if (user == null || user.RefreshToken != model.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                throw new SecurityTokenException("Invalid refresh token");
            }
            var jwtToken = await GenerateJwtToken(user);

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }

        public async Task<bool> UpdateUserAsync(string id,RegisterUserDto dto)
        {
             
          
            var user = await userManager.FindByIdAsync(id);

            if (user == null || id != user.Id)
            {
                return false;
            }
            user.PersonName = dto.PersonName;
            user.PersonNo = dto.PersonNo;
            user.RankId = dto.RankId;
            user.PersonPosition = dto.PersonPosition;
            user.Cisco = dto.Cisco;
            user.HrTest = dto.HrTest;
            user.ur_no = dto.Ur_no;
            user.Updated_date = DateTime.UtcNow;
            user.Updated_by = GetCurrentUserId().GetAwaiter().GetResult();

            _context.ApplicationUser.Update(user);
            var res = await _context.SaveChangesAsync() > 0;
            if (res)
            {
                List<ApplicationUserManageMinistry> M = [];
                M = _context.ApplicationUserManageMinistries.Where(i => i.ApplicationUserId == user.Id).ToList();
                if (M.Count != 0)
                {
                    _context.ApplicationUserManageMinistries.RemoveRange(M);
                    await _context.SaveChangesAsync();
                    M = [];
                }


                foreach (var item in dto.UnitUser)
                {
                    M.Add(new() { ApplicationUserId = user.Id, ManageMinistryId = item });
                }
                _context.ApplicationUserManageMinistries.AddRange(M);
                await _context.SaveChangesAsync();


                IList<string> Roles = await userManager.GetRolesAsync(user);
                var res1 = await userManager.RemoveFromRolesAsync(user, Roles);
                if (res1.Succeeded)
                {
                    await userManager.AddToRolesAsync(user!, dto.RoleWithUserDto.Where(i => i.isSelected).Select(i => i.roleName));
                }

                return true;
            }

            return false;
        }
        
        public async Task<bool> LockInOutAsync(string UserId)
        {
            var user = await userManager.FindByIdAsync(UserId);
            //var colsed = await userManager.FindByIdAsync(GetCurrentUserId().GetAwaiter().GetResult());

            if (user is null)
            {
                return false;
            }
            user.LockoutEnabled = !user.LockoutEnabled;
            if (user.LockoutEnabled) {

                user.ClosedBy = GetCurrentUserId().GetAwaiter().GetResult();
                user.LockoutEnd = DateTime.Now;
                _context.ApplicationUser.Update(user);
                return await _context.SaveChangesAsync() > 0;
            }
            else
            {
                    user.ClosedBy = "";
                     user.LockoutEnd = null;
                user.Updated_by = GetCurrentUserId().GetAwaiter().GetResult();
                user.Updated_date = DateTime.Now;
                _context.ApplicationUser.Update(user);
                return await _context.SaveChangesAsync() > 0;
            }
           
            

             
        }
        public async Task<bool> SetPasswordAsync(string Id)
        {
            var user = await userManager.FindByIdAsync(Id);

            if (user is null)
            {
                return false;
            }

            user.PasswordHash = "AQAAAAEAACcQAAAAEEoZHfYt7fsFBomfdo3wNF5sSijVixufjlJuwyu8Cv8td4LL4YWvn0x59RnCd0ia4g==";
            user.Password =Encrypt("Password1");
            user.PassChange = false;

            _context.ApplicationUser.Update(user);
            return await _context.SaveChangesAsync() > 0;


             
        }


        public async Task<bool> SetPasswordNewAsync(resetPass resPass )
        {
            var principal = GetPrincipalFromExpiredToken(resPass.token);
            var username = principal.Claims.First().Value; // retrieve the username from the expired token

            var user = await userManager.FindByNameAsync(username);
 

            if (user is null)
            {
                return false;
            }

           await userManager.RemovePasswordAsync(user);
           await userManager.AddPasswordAsync(user, resPass.NewPassword);

            user.Password = Encrypt(resPass.NewPassword);
            user.PassChange = true;

            _context.ApplicationUser.Update(user);
            return await _context.SaveChangesAsync() > 0;


            
        }
        public string Encrypt(string clearText)
        {
            string encryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new(encryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using MemoryStream ms = new();
                using (CryptoStream cs = new(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(clearBytes, 0, clearBytes.Length);
                    cs.Close();
                }
                clearText = Convert.ToBase64String(ms.ToArray());
            }

            return clearText;
        }

        public string Decrypt(string cipherText)
        {
            string encryptionKey = "MAKV2SPBNI99212";
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new(encryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using MemoryStream ms = new();
                using (CryptoStream cs = new(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(cipherBytes, 0, cipherBytes.Length);
                    cs.Close();
                }
                cipherText = Encoding.Unicode.GetString(ms.ToArray());
            }

            return cipherText;
        }

    }
}
