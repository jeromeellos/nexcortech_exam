using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace WebApi.Models
{
    public class ApiResponse<T> where T : class
    {
        public int status_code { get; set; } = (int)HttpStatusCode.OK;

        public bool success { get; set; } = true;

        public string message { get; set; }

        public T d { get; set; }

    }
}
