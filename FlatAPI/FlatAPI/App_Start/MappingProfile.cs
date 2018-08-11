using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using FlatAPI.Models.Domain;
using FlatAPI.Models.DTO;

namespace FlatAPI.App_Start
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Flat, FlatViewModel>();
            CreateMap<FlatViewModel, Flat>();
            CreateMap<Residents, ResidentsViewModel>();
            CreateMap<ResidentsViewModel, Residents>();
        }
    }
}