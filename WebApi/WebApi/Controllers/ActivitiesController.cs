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
    [Route("api/equipment/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly DataContext _context;
        public ActivitiesController(DataContext context)
        {
            _context = context;
        }


        [HttpGet()]
        public async Task<ApiResponse<IEnumerable<EquipmentActivity>>> Get()
        {
            var resp = new ApiResponse<IEnumerable<EquipmentActivity>>();
            try
            {
                resp.d = await _context.EquipmentActivityList.ToListAsync();
            }
            catch (Exception ex) {
                resp.status_code = (int)HttpStatusCode.InternalServerError;
                resp.message = ex.Message;
            }
            return resp;
        }

        [HttpGet("{id}")]
        public async Task<ApiResponse<IEnumerable<EquipmentActivity>>> Get(int id)
        {
            var resp = new ApiResponse<IEnumerable<EquipmentActivity>>();
            try
            {
                resp.d = await _context.EquipmentActivityList.Where(e => e.EquipmentID == id).ToListAsync();
            }
            catch (Exception ex)
            {
                resp.status_code = (int)HttpStatusCode.InternalServerError;
                resp.message = ex.Message;
            }
            return resp;
        }

        [HttpPost]
        public async Task<ApiResponse<EquipmentActivity>> Post(EquipmentActivity post)
        {
            var resp = new ApiResponse<EquipmentActivity>();
            try
            {
                var equipment = await _context.EquipmentActivityList.AddAsync(post);
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

        [HttpPut]
        public async Task<ApiResponse<EquipmentActivity>> Put(int id, EquipmentActivity post)
        {
            var resp = new ApiResponse<EquipmentActivity>();
            try
            {
                var equipment = await _context.EquipmentActivityList.SingleOrDefaultAsync(e => e.ID == id);
                if (equipment != null)
                {
                   

                    _context.EquipmentActivityList.Update(equipment);
                }

                resp.d = equipment;
            }
            catch (Exception ex)
            {
                resp.status_code = (int)HttpStatusCode.InternalServerError;
                resp.message = ex.Message;
            }
            return resp;
        }
        
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
