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
                ))
                .ForMember(d => d.Id, o => o.MapFrom(
                    s => s.AppUser.Id
                ));
            CreateMap<AttendeeExpense, AttendeeProfile>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(
                    s => s.AppUser.DisplayName
                ))
                .ForMember(d => d.Id, o => o.MapFrom(
                    s => s.AppUser.Id
                ));
            CreateMap<AppUser, AttendeeProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(
                s => s.DisplayName
            ));
            CreateMap<Trip, TripDto>()
                .ForMember(s => s.Id, o => o.MapFrom(d => d.Id));
            CreateMap<Expense, ExpenseDto>();
        }

    }
}