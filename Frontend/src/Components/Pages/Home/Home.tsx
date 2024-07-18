import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import sinceImage from "../../../Assets/Images/_5578901.png";
import newsLetterImage from "../../../Assets/Images/letter_13639853.png";
import { companiesService } from "../../../Services/CompaniesService";
import { notify } from "../../../Utils/Notify";
import "./Home.css";

import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../../../Redux/Store";

export function Home(): JSX.Element {
  //   const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const companies = useAppSelector((state) => state.companies.entities);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchCompanies = async (): Promise<void> => {
      try {
        await companiesService.getAll();
      } catch (err: any) {
        notify.error(err);
      }
    };
    fetchCompanies();
  }, []);

  return (
    <div className="Home">
      <header className="hero">
        <div className="container spacing">
          <h1 className="primary-title">Our &nbsp; S & C &nbsp; brands</h1>
          <p>
            <img className="since-image" src={sinceImage} />
          </p>
          <NavLink className="btn" to={"/products"}>
            See what we have
          </NavLink>
        </div>
      </header>

      <main>
        <section className="featured">
          <div className="container">
            <h2 className="section-title">Our Companies</h2>
            <div className="split">
              {companies.map((company, index) => (
                <NavLink
                  key={index}
                  to={`/products?companyId=${company._id}`}
                  className="featured-item"
                >
                  <img
                    src={company.imageUrl}
                    alt=""
                    className="featured-image"
                  />
                  <p className="featured-details"></p>
                </NavLink>
              ))}
            </div>
          </div>
        </section>

        <section className="subscribe w-full flex justify-center rounded-xl">
          <div className="bg-[#FFEFD5] w-5/6 mr-2 ml-2 py-16 px-6 text-[#333] font-[sans-serif] rounded-xl">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center md:gap-6 gap-12">
              <div className="max-md:order-1">
                <h2 className="text-4xl font-extrabold mb-6 text-black">
                  Subscribe to Our Newsletter
                </h2>
                <p className="font-mono font-extrabold text-xl text-black">
                  Subscribe to our newsletter and stay up to date with the
                  latest news, updates, and exclusive offers. Get valuable
                  insights. Join our community today!
                </p>
                <div className="mt-10 flex max-sm:flex-col  md:min-w-40 sm:gap-4 gap-6">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full min-w-52 bg-gray-50 py-3.5 px-4 text-[#333] text-base focus:outline-none rounded"
                  />
                  <button className="bg-[#333] hover:bg-[#222] text-white text-base font-semibold py-3.5 px-6 rounded focus:outline-none">
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="flex h-40 justify-center">
                <img src={newsLetterImage} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
