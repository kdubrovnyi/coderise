using System.Collections.Generic;
using System.Web.Http;
using coderise.service.Models;

namespace coderise.service.Controllers
{
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
                    FileList = new []
                    {
                        "model.cs",
                        "shit-code.config"
                    }
                }, 
                new ShelvesetModel(),
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