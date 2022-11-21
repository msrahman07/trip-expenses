using System.Security.Claims;
using API.DTOs;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IAttendeeRepository attendeeRepository;
        private readonly IMapper mapper;

        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IAttendeeRepository attendeeRepository,
            IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.attendeeRepository = attendeeRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<UserDto> GetCurrentUser()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if(String.IsNullOrEmpty(email)) return null!;
            var user = await userManager.FindByEmailAsync(email);
            if(user == null) return null!;
            return new UserDto
            {
                Email = email,
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user)
            };
        }

        [HttpGet("all")]
        public async Task<IReadOnlyList<AttendeeProfile>> GetAllUsers()
        {
            var users = await attendeeRepository.GetAllUsers();
            return mapper.Map<IReadOnlyList<AppUser>, IReadOnlyList<AttendeeProfile>>(users);
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

        [HttpPost("logout")]
        public void Logout()
        {
            Response.Headers.Remove("Authorization");
        }
        
    }
}