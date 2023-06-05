sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("campeonatobrasileiro.controller.Main", {
            onInit: function () {
 /*            // ACESSO AOS DADOS DE ARQUIVO LOCAL JSON (FASE DE TESTES)

               // criando um modelo

                // antes as variaveis do modelo
                var dadosGerais = {
                    rodada : '10a',
                    campeonato : "Brasileirão 2023 do canal FioriNet"
                };

                // agora vamos criar o modelo
                var dadosModel = new JSONModel();
                dadosModel.setData(dadosGerais);
                var view = this.getView();

                // Atribuir os dados à tela (view)
                // ModelosDadosGerais é o nome que será usado dentro da view
                view.setModel(dadosModel, "ModeloDadosGerais"); */


                // ACESSO AOS DADOS DIRETAMENTE DE API (API-FUTEBOL.COM.BR)

                // 3 variáveis vazias
                var dadosGerais = {};
                var classificacao = {};
                var partidas = {};

                // 3 modelos

                // variável dentro do parentreses substitui ocomando setdata (pois é um CONSTRUTOR)
                var dadosModel = new JSONModel(dadosGerais);
                var classificacaoModel = new JSONModel(classificacao);
                var partidasModel = new JSONModel(partidas);

                //Atribuimos 3 modelos à view (tela)
                this.getView().setModel(dadosModel, "ModeloDadosGerais");
                this.getView().setModel(classificacaoModel, "ModeloClassificacao");
                this.getView().setModel(partidasModel, "ModeloPartidas");

                this.buscarDadosGerais();
                this.buscarClassificacao();
                this.buscarPartidas();
            },

            buscarDadosGerais : function(){
                //ober o modelo a ser atualizado
                var dadosModel2 = this.getView().getModel("ModeloDadosGerais");

                const configuracoes = {
                    url    : "https://api.api-futebol.com.br/v1/campeonatos/10",
                    method : "GET",
                    async  : true,
                    crosDomain : true,
                    headers : {
                        "Authorization" : "Bearer live_XXX",
                    }
                };

                //chamada da API
                $.ajax(configuracoes)
                    // SUCESSO - obtendo retorno
                    .done(function (resposta) {
                        debugger
                        dadosModel2.setData(resposta)
                        this.buscarPartidas(resposta.rodada_atual.rodada);
                    }.bind(this))

                    // ERRO - obtendo retorno
                    .fail(function (erro) {
                        debugger
                });
            },

            buscarClassificacao: function () {
                const classificacaoModel2 = this.getView().getModel("ModeloClassificacao");

                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_XXX"
                    }
                };

                $.ajax(configuracoes)
                    .done(function (resposta) {
                        classificacaoModel2.setData({ "Classificacao": resposta })
                    })
                    .fail(function (erro) {
                        debugger
                    });
            },

            buscarPartidas: function (rodada) {
                const partidasModel2 = this.getView().getModel("ModeloPartidas");

                const configuracoes = {
                    url: "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    headers: {
                        "Authorization": "Bearer live_XXX"
                    }
                };

                $.ajax(configuracoes)
                    .done(function (resposta) {
                        debugger
                        partidasModel2.setData(resposta)
                    })
                    .fail(function (erro) {
                        debugger
                    });
            }
        });
    });
