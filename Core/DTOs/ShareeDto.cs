using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.DTOs
{
    public class ShareeDto
    {
        public string Sharee { get; set; } = null!;
        public decimal Amount { get; set; }
    }
}