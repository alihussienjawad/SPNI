using Python.Runtime;
using SPNI.Server.DTO;

namespace SPNI.Server.Services
{
    public class PythonService : IDisposable
    {
        public PythonService()
        {
            PythonEngine.Initialize(); // Initialize the Python engine
            PythonEngine.BeginAllowThreads();
        }

        public string RunTranslation(TranslatorDto dto)
        {
           
            using (Py.GIL()) // Acquire the GIL
            {
                dynamic translator = Py.Import("translator"); // Import your Python module
                try
                {
                    var x= translator.run_translation(dto.Text, dto.Sl, dto.Tl);
                    return x;
                }
                catch
                {
                    return string.Empty;
                } 
            }
        }

        public void Dispose()
        {
            PythonEngine.Shutdown(); // Cleanup
        }
    }
}
