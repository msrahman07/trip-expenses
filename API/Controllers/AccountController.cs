using System.Security.Claims;
using API.DTOs;
using Core.Entities.Identity;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly DataContext context;

        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            DataContext context)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.context = context;
        }

        [HttpGet]
        public async Task<string> GetCurrentUserDisplayName()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if(String.IsNullOrEmpty(email)) return null!;
            return user.DisplayName;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);
            if(user == null) return Unauthorized("Unable to login");
            
            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if(result.Succeeded)
            {
                return new UserDto 
                {
                    Email= user.Email,
                    DisplayName = user.DisplayName,
                    Token = tokenService.CreateToken(user)
                };
            }
            else{
                return Unauthorized("Invalid email or password");
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new AppUser 
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email, 
                UserName = registerDto.Email  
            };
            var result = await userManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded)
            {
                return BadRequest("Unable to register user!!");
            }
            return new UserDto 
                {
                    Email= user.Email,
                    DisplayName = user.DisplayName,
                    Token = tokenService.CreateToken(user)
                };
        }
        
    }
}