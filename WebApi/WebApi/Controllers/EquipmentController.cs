using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly DataContext _context;
        public EquipmentController(DataContext context)
        {
            _context = context;
        }


        [HttpGet()]
        public async Task<ApiResponse<IEnumerable<Equipment>>> Get()
        {
            var resp = new ApiResponse<IEnumerable<Equipment>>();
            try
            {
                resp.d = await _context.EquipmentList.ToListAsync();
            }
            catch (Exception ex) {
                resp.status_code = (int)HttpStatusCode.InternalServerError;
                resp.message = ex.Message;
            }
            return resp;
        }

        [HttpGet("{id}")]
        public async Task<ApiResponse<Equipment>> Get(int id)
        {
            var resp = new ApiResponse<Equipment>();
            try
            {
                resp.d = await _context.EquipmentList.SingleOrDefaultAsync(e => e.ID == id);
            }
            catch (Exception ex)
            {
                resp.status_code = (int)HttpStatusCode.InternalServerError;
                resp.message = ex.Message;
            }
            return resp;
        }

        [HttpPost]
        public async Task<ApiResponse<Equipment>> Post(Equipment post)
        {
            var resp = new ApiResponse<Equipment>();
            try
            {
                var equipment = await _context.EquipmentList.AddAsync(post);
                resp.status_code = (int)HttpStatusCode.Created;
                resp.d = post;
            }
            catch (Exception ex)
            {
                resp.status_code = (int)HttpStatusCode.InternalServerError;
                resp.message = ex.Message;
            }
            return resp;
        }
        
        //[HttpPut]
        //public async Task<Equipment> Put(int id, Equipment post)
        //{
        //    var equipment = await _context.EquipmentList.SingleOrDefaultAsync(e => e.ID == id);
        //    if (equipment != null) {
        //        equipment.EquipmentName = post.EquipmentName;
        //        equipment.EquipmentLocation = post.EquipmentLocation;
        //        equipment.PurchasePrice = post.PurchasePrice;
        //        equipment.Purchased = post.Purchased;

        //        _context.EquipmentList.Update(equipment);
        //    }

        //    return post;
        //}

        //[HttpDelete]
        //public async Task<Equipment> Delete(Equipment post)
        //{
        //    var equipment = await _context.EquipmentList.SingleOrDefaultAsync(e => e.ID == post.ID);
        //    if (equipment != null)
        //    {
        //        equipment.Active = false;
        //        _context.EquipmentList.Update(equipment);
        //    }

        //    return post;
        //}


    }
}
