using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using coderise.service.Models;

namespace coderise.service.Controllers
{
    [EnableCors("http://localhost:5000", "*", "*")]
    public class ShelvesetsController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<ShelvesetModel> Get()
        {
            return new []
            {
                new ShelvesetModel
                {
                    Id = 1,
                    Title = "the best shelveset ever :)",
                    Description = "to code review best shelveset",
                    Owner = "Konstantin Dubrovniy",
                    CreatedAt = DateTime.Now.Subtract(TimeSpan.FromMinutes(5)),
                    FileList = new []
                    {
                        "model.cs",
                        "shit-code.config"
                    }
                }, 
                new ShelvesetModel
                {
                    Id = 2,
                    Title = "Default title",
                    Description = "it is a long long story",
                    Owner = "Alex Chernenko",
                    CreatedAt = DateTime.Now.Subtract(TimeSpan.FromDays(3)),
                    FileList = new []
                    {
                        "app.config",
                        "Global.asax.cs"
                    }
                },
            };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}