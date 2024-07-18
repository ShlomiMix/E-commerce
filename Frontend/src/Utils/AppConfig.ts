class AppConfig {
    // Base Url
    private readonly prefix = "http://localhost:4000/api/"   
    // Backend urls:
    public readonly categoriesUrl = `${this.prefix}categories/`;
    public readonly productsUrl = `${this.prefix}products`;
    public readonly subCategoriesUrl = `${this.prefix}sub-categories/`;
    public readonly clothesUrl = `${this.prefix}clothes/`;
    public readonly shoesUrl = `${this.prefix}shoes/`;
    public readonly clothesSizesUrl = `${this.prefix}clothing-sizes/`
    public readonly accessoriesSizesUrl = `${this.prefix}accessories-sizes/`
    public readonly shoesSizesUrl = `${this.prefix}shoes-sizes/`
    public readonly colorsUrl = `${this.prefix}colors/`
    public readonly companiesUrl = `${this.prefix}companies/`
    public readonly audiencesUrl = `${this.prefix}audience/`
    public readonly ordersUrl = `${this.prefix}orders/`
    public readonly registerUrl = `${this.prefix}register/`
    public readonly loginUrl = `${this.prefix}login/`
    

    //Axios options:
    public readonly axiosOptions = {
        headers: { // Tell axios to also send the image:
            "Content-Type": "multipart/form-data" // We're sending also files.
        }
    };
}

export const appConfig = new AppConfig();
