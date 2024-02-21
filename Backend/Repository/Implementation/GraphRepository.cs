using Algoritm.Repository.Interface;

namespace Algoritm.Repository.Implementation
{
    public class GraphRepository : IGraphRepository
    {
        public int CountParts(int[][] grid)
        {
            if (grid == null || grid.Length == 0 || grid[0].Length == 0)
            {
                return 0;
            }

            int m = grid.Length;
            int n = grid[0].Length;
            int parts = 0;

            void DFS(int i, int j)
            {
                if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == 0)
                {
                    return;
                }

                grid[i][j] = 0;
                DFS(i + 1, j);
                DFS(i - 1, j);
                DFS(i, j + 1);
                DFS(i, j - 1);
            }

            for (int i = 0; i < m; i++)
            {
                for (int j = 0; j < n; j++)
                {
                    if (grid[i][j] == 1)
                    {
                        DFS(i, j);
                        parts++;
                    }
                }
            }

            return parts;
        }
    }
}
