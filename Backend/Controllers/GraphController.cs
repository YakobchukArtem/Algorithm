using Algoritm.Models;
using Algoritm.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;


namespace Algoritm.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GraphController : ControllerBase
    {
        private readonly IGraphRepository graphRepository;
        public GraphController(IGraphRepository graphRepository) {
                this.graphRepository = graphRepository;
        }
        [HttpPost]
        //https://localhost:7027/api/Graph
        public Task<IActionResult> Calculate([FromBody] Graph graph)
        {
            if (graph == null)
            {
                return Task.FromResult<IActionResult>(BadRequest("Invalid graph data"));
            }

            int numberOfParts = this.graphRepository.CountParts(graph.Nodes);
            return Task.FromResult<IActionResult>(Ok(numberOfParts));
        }
    }
}
