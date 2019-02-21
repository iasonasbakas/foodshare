import braintree

gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="b435kz2mnnvjb53c",
        public_key="hn8w65zf4bhkzt5v",
        private_key="1799a930cc65e2eefbb1cdc4645b0988"
    )
)

client_token = gateway.client_token.generate({
    "customer_id": a_customer_id
})

@app.route("/client_token", methods=["GET"])
def client_token():
  return gateway.client_token.generate()
