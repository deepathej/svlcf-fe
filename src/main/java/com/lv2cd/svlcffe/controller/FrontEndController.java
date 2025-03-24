package com.lv2cd.svlcffe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@SuppressWarnings("unused")
public class FrontEndController {

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return home.html page
   */
  @GetMapping("/home")
  public String homePage() {
    return "home";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * <p>API @return sale.html page
   */
  @GetMapping("/sale")
  public String salePage() {
    return "sale";
  }

  /**
   * redirects all the /home calls to respective html page
   *
   * <p>API @return payment.html page
   */
  @GetMapping("/payment")
  public String paymentPage() {
    return "payment";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return expense.html page
   */
  @GetMapping("/expense")
  public String expensePage() {
    return "expense";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return users.html page
   */
  @GetMapping("/users")
  public String usersPage() {
    return "users";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return stock.html page
   */
  @GetMapping("/stock")
  public String stockPage() {
    return "stock";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return tdPayment.html page
   */
  @GetMapping("/tdPayment")
  public String tdPaymentPage() {
    return "tdPayment";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return tdExpense.html page
   */
  @GetMapping("/tdExpense")
  public String tdExpensePage() {
    return "tdExpense";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return reports.html page
   */
  @GetMapping("/reports")
  public String reportsPage() {
    return "reports";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return addStock.html page
   */
  @GetMapping("/addStock")
  public String addStockPage() {
    return "addStock";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return analytics.html page
   */
  @GetMapping("/analytics")
  public String analyticsPage() {
    return "analytics";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return extraLinks.html page
   */
  @GetMapping("/extraLinks")
  public String extraLinksPage() {
    return "extraLinks";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return priceUpdate.html page
   */
  @GetMapping("/priceUpdate")
  public String priceUpdatePage() {
    return "priceUpdate";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return newStock.html page
   */
  @GetMapping("/newStock")
  public String newStockPage() {
    return "newStock";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return user.html page
   */
  @GetMapping("/user")
  public String userPage() {
    return "user";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return userUpdate.html page
   */
  @GetMapping("/userUpdate")
  public String userUpdatePage() {
    return "userUpdate";
  }

  /**
   * API redirects all the /home calls to respective html page
   *
   * @return balance.html page
   */
  @GetMapping("/balance")
  public String balancePage() {
    return "balance";
  }
}
