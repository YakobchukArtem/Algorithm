using System.ComponentModel.DataAnnotations;

namespace Algoritm.Models
{
    public class Graph
    {
        [Required]
        public int[][] Nodes { get; set; }
    }

}
