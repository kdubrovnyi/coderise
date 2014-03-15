using System.Web.Http;

namespace coderise.service
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);

            GlobalConfiguration.Configure(WebApiConfig.ConfigureFormatters);
        }
    }
}
