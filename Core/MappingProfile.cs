using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Entities.Identity;

namespace Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Trip, Trip>();
            CreateMap<TripAttendee, AttendeeProfile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(
                    s => s.AppUser.DisplayName
                ));
            CreateMap<Trip, TripDto>();
        }

    }
}