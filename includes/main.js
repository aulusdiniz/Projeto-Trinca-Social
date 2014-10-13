//função que é executada na resposta da caixa: "gostaria de publicar essa trinca agora?".
function next_step(bool){
	if(bool){
		$('#enchant-stage').css('display','none');
		$('#enchant-stage').css('opacity','1');
		$('#ask_publish').css('display','none');
		$('#publish_now').css('display','inline');	
		$('#publish_now_cards').css('display','inline');	
		$('#card1').attr('src',"../imgs/cards/"+getCard(0)+".png");
		$('#card2').attr('src',"../imgs/cards/"+getCard(1)+".png");
		$('#card3').attr('src',"../imgs/cards/"+getCard(2)+".png");
		
	}else{
		//adicionar ação para botão "não".
	}
	

}

function publish(bool){
	//função ao pressionar o botão de publicar na caixa de dialogo da justificativa.
}

function getCard(index){
	
	return trinca_export[index];
}

var trinca_export = [];

 	enchant();
window.onload = function() {	
    var game = new Game(window.screen.availWidth, window.screen.availHeight);
	//Escalas
	var sprite_scale = 3/5;
	var sprite_width = 176;
	var sprite_height = 274;
	var spacing_hor = 10;
	var spacing_ver = -sprite_width/3;
	var desl_hor = 200;
	var desl_ver = 100;
	
		//carrega as imagens necessárias na hora que o jogo liga, disponibiliza em game.assets(['../imgs/cards/s001.png']);
    	game.preload(
			'../imgs/cards/casa-01.png',
			'../imgs/cards/casa-02.png',
			'../imgs/cards/casa-03.png',
			'../imgs/cards/casa-04.png',
			'../imgs/cards/casa-05.png',
			'../imgs/cards/casa-06.png',
			'../imgs/cards/casa-07.png',
			'../imgs/cards/casa-08.png',
			'../imgs/cards/casa-09.png',
			'../imgs/cards/casa-10.png',
			'../imgs/cards/casa-11.png',
			'../imgs/cards/casa-12.png',
			'../imgs/cards/casa-13.png',
			'../imgs/cards/casa-14.png',
			'../imgs/cards/casa-15.png',
			'../imgs/cards/casa-16.png',
			'../imgs/cards/casa-17.png',
			'../imgs/cards/casa-18.png',
			'../imgs/cards/casa-19.png',
			'../imgs/cards/casa-20.png',
			'../imgs/cards/casa-21.png',
			'../imgs/cards/casa-22.png',
			'../imgs/cards/casa-23.png',
			'../imgs/cards/casa-24.png',
			'../imgs/cards/casa-25.png',
			'../imgs/cards/casa-26.png',
			'../imgs/cards/casa-27.png',
			'../imgs/cards/casa-28.png',
			'../imgs/cards/casa-29.png',
			'../imgs/cards/casa-30.png',
			'../imgs/cards/casa-31.png',
			'../imgs/cards/casa-32.png',
			'../imgs/cards/casa-33.png',
			'../imgs/cards/casa-34.png',
			'../imgs/cards/casa-35.png',
			'../imgs/cards/casa-36.png',
			'../imgs/cards/casa-37.png',
			'../imgs/cards/casa-38.png',
			'../imgs/cards/casa-39.png',
			'../imgs/cards/casa-40.png',
			'../imgs/cards/casa-41.png',
			'../imgs/cards/casa-42.png',
			'../imgs/cards/casa-43.png',
			'../imgs/cards/casa-44.png',
			'../imgs/cards/casa-45.png',
			'../imgs/cards/casa-46.png',
			'../imgs/cards/casa-47.png',
			'../imgs/cards/casa-48.png',
			'../imgs/cards/casa-49.png',
			'../imgs/cards/casa-50.png',
			'../imgs/cards/casa-51.png',
			'../imgs/cards/casa-52.png',
			'../imgs/cards/casa-53.png',
			'../imgs/cards/casa-54.png',
			'../imgs/cards/casa-55.png',
			'../imgs/cards/casa-56.png',
			'../imgs/cards/casa-57.png',
			'../imgs/cards/casa-58.png',
			'../imgs/cards/casa-59.png',
			'../imgs/cards/casa-60.png',
			'../imgs/cards/casa-61.png',
			'../imgs/cards/casa-62.png',
			'../imgs/cards/casa-63.png',
			'../imgs/cards/casa-64.png',
			'../imgs/cards/casa-65.png',
			'../imgs/cards/casa-66.png',
			'../imgs/cards/casa-67.png',
			'../imgs/cards/casa-68.png',
			'../imgs/cards/casa-69.png',
			'../imgs/cards/casa-70.png',
			'../imgs/cards/casa-71.png',
			'../imgs/cards/casa-72.png',
			'../imgs/cards/casa-73.png',
			'../imgs/cards/casa-74.png',
			'../imgs/cards/casa-75.png',
			'../imgs/cards/casa-76.png',
			'../imgs/cards/casa-77.png',
			'../imgs/cards/casa-78.png',
			'../imgs/cards/casa-79.png',
			'../imgs/cards/casa-80.png',
			'../imgs/cards/casa-81.png',
			'../imgs/cards/casa-82.png',
			'../imgs/cards/casa-83.png',
			'../imgs/cards/casa-84.png',
			'../imgs/cards/casa-85.png',
			'../imgs/cards/casa-86.png',
			'../imgs/cards/casa-87.png',
			'../imgs/cards/casa-88.png',
			'../imgs/cards/casa-89.png',
			'../imgs/cards/casa-90.png',
			'../imgs/cards/casa-91.png',
			'../imgs/cards/casa-92.png',
			'../imgs/cards/casa-93.png',
			'../imgs/cards/casa-94.png',
			'../imgs/cards/casa-95.png',
			'../imgs/cards/casa-96.png',
			'../imgs/cards/casa-97.png',
			'../imgs/cards/casa-98.png',
			'../imgs/cards/casa-99.png',
			'../imgs/cards/casa-100.png',
			'../imgs/cards/slot.png',
			'../imgs/cards/deck.png'
			);
		
	//fundo verde, igual ao html;	
	game.rootScene.backgroundColor = '#0d591d';

	//Baralho, atualiza os slots do holder
    var Deck = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y, holder, hand, cards) {
            enchant.Sprite.call(this, sprite_width, sprite_height);
            this.x = x;
            this.y = y;
			this.scale(sprite_scale,sprite_scale);
            this.image = game.assets['../imgs/cards/deck.png'];
			this.availCards = cards;
			this.usedCards = [];
			this.giveCard = function(target){
				
				if(Dealer.tradeOne!=null){
					Dealer.unselectCard(Dealer.tradeOne);
					Dealer.tradeOne = null;
					Dealer.tradeOp = 0;
					}
				if(this.availCards.length>0){
					var rand = Math.floor(Math.random()*this.availCards.length);
					target.updateSlots(this.availCards[rand]);
					this.usedCards.push(this.availCards.slice(rand));
					this.availCards.splice(rand,1);
					if(this.availCards.length<1){
						this.image = game.assets['../imgs/cards/slot.png'];
						}
				}
				}
			this.giveCardToSlot = function(target){//preenche o espaço que sobra ao trocar as cartas.
				if(this.availCards.length>0){
					var rand = Math.floor(Math.random()*this.availCards.length);
					target.image = this.availCards[rand].image;
					target.name = this.availCards[rand].name;
					target.isEmpty = false;
					this.usedCards.push(this.availCards.slice(rand));
					this.availCards.splice(rand,1);
					if(this.availCards.length<1){
						this.image = game.assets['../imgs/cards/slot.png'];
						}
					}
				}	
			this.giveHand = function(){
					for(var i=0; i<6; i++){
						this.giveCard(hand);
					}
				}
			this.addEventListener('touchend', function(){	
				this.giveCard(holder);
            });
            game.rootScene.addChild(this);
        }
    });
	
	var Card = enchant.Class.create({
		initialize: function(name, asset){
			this.name = name;
			this.image = asset;
		}
	});


//==============================================================================Slots para cartas==========//	
	var Slot = enchant.Class.create(enchant.Sprite, {
		initialize: function(x, y){
			enchant.Sprite.call(this, sprite_width, sprite_height);
			this.x = x;
			this.y = y;
			this.name = null;
			this.isEmpty = true;
			this.updateImage = function(asset){
				this.image = asset;
				}
			this.updateName = function(name){
				this.name = name;
				}				
			this.getImage = function(){
				return this.image;
				}	
			this.scale(sprite_scale,sprite_scale);
			this.image = game.assets['../imgs/cards/slot.png'];
			game.rootScene.addChild(this);
			}
		});
		
	var Slot_holder = enchant.Class.create(Slot, {
		initialize: function(x, y){
			Slot.call(this, sprite_width, sprite_height);
			this.x = x;
			this.y = y;
			//seleção de carta.	
			this.addEventListener('touchend', function(){	
				if(!this.isEmpty || Dealer.tradeOne!=null)
					Dealer.trade(this);
            });
			game.rootScene.addChild(this);
			}
		});
		
		var Slot_hand = enchant.Class.create(Slot, {
		initialize: function(x, y){
			Slot.call(this, sprite_width, sprite_height);
			this.x = x;
			this.y = y;
			//this.scale(sprite_scale,sprite_scale);
			//seleção de carta.
			this.addEventListener('touchend', function(){	
				if(!this.isEmpty || Dealer.tradeOne!=null)
					Dealer.trade(this);
            });
			game.rootScene.addChild(this);
			}
		});
		
		var Slot_trinca = enchant.Class.create(Slot, {
		initialize: function(x, y){
			Slot.call(this, sprite_width, sprite_height);
			this.x = x;
			this.y = y;
			//seleção de carta.
			this.addEventListener('touchend', function(){	
				if(!this.isEmpty || Dealer.tradeOne!=null)
					Dealer.trade(this);
            });
			game.rootScene.addChild(this);
			}
		});
//============================================================================================================//		
	//valor que a carta será destacada das outras.
	var selectOffset = (sprite_height*sprite_scale + spacing_ver)*0.2;
	var handPos = desl_ver-3*spacing_ver;
	//Troca de cartas e interação do usuário com o jogo.
	var Dealer = enchant.Class.create({
		initialize: function(deck, trinca){
				Dealer.tradeOne = null;
				Dealer.tradeTwo = null;
				Dealer.tradeOp = 0;
				Dealer.trincas = 0;
				Dealer.unselectCard = function(obj){
					//view: unselect card
					obj.y += selectOffset;
				}
				Dealer.trade = function(obj){
					//verifica se o não é o mesmo obj já selecionado e 
					//se não está na parte que não pode mais ser escolhida do descarte.
					if(obj != Dealer.tradeOne && obj.y >= desl_ver){						
						//view: select card
						obj.y -= selectOffset;
					//Sequência de ação de clique de escolha para troca.
					switch(Dealer.tradeOp){
						case 0:{
							//Não escolhe espaço vazios no primeiro clique.
							if(obj.isEmpty){
								break;
								}
							Dealer.tradeOne = obj;
							Dealer.tradeOp++;
							break;
							}
						case 1:{
							//Apenas a trinca pode ser escolhida com espaço vazio.
							if(obj.isEmpty){
								if(obj.y<=handPos && !(Dealer.tradeOne.y>handPos)){
									Dealer.unselectCard(Dealer.tradeOne);
									Dealer.unselectCard(obj);
									Dealer.tradeOne = null;
									Dealer.tradeOp = 0;
									break;
								}
								if(Dealer.tradeOne.y>handPos && obj.y<=desl_ver){
									Dealer.unselectCard(Dealer.tradeOne);
									Dealer.unselectCard(obj);
									Dealer.tradeOne = null;
									Dealer.tradeOp = 0;
									break;
								}
								if(Dealer.tradeOne.y<=desl_ver && obj.y>handPos){
									Dealer.unselectCard(Dealer.tradeOne);
									Dealer.unselectCard(obj);
									Dealer.tradeOne = null;
									Dealer.tradeOp = 0;
									break;
								}
							}
							if(obj.y != Dealer.tradeOne.y){
									
									var tempObj = obj.image;
									var tempNameObj = obj.name;

									Dealer.tradeTwo = obj;
									Dealer.tradeTwo.updateImage(Dealer.tradeOne.image);
									Dealer.tradeTwo.updateName(Dealer.tradeOne.name);
									Dealer.tradeOne.updateImage(tempObj);
									Dealer.tradeOne.updateName(tempNameObj);
									
									var tempBool = Dealer.tradeOne.isEmpty;
									
									Dealer.tradeOne.isEmpty = Dealer.tradeTwo.isEmpty;
									Dealer.tradeTwo.isEmpty = tempBool;
									Dealer.unselectCard(Dealer.tradeOne);
									Dealer.unselectCard(Dealer.tradeTwo);
									Dealer.tradeOne = null;
									Dealer.tradeTwo = null;
									Dealer.tradeOp = 0;
									
									if(trinca.checkEndgame()){
										$("#ask_publish").css("display","inline");
										$("#enchant-stage").css("pointer-events","none");
										$("#enchant-stage").css("opacity","0.5");

										}
							}
							else{
								//Não permite o destaque de espaço vazio na trinca.
								if(obj.isEmpty){
									Dealer.unselectCard(Dealer.tradeOne);
									Dealer.unselectCard(obj);
									Dealer.tradeOne = null;
									Dealer.tradeOp = 0;
									break;
									}
								Dealer.unselectCard(Dealer.tradeOne);
								Dealer.tradeOne = obj;		
								Dealer.tradeOp = 1;
								}
							break;
							}
						default:{
							//nothing;
							}	
						}
					}
					else{
						if(obj == Dealer.tradeOne){
							Dealer.unselectCard(Dealer.tradeOne);
							Dealer.tradeOne = null;
							Dealer.tradeOp = 0;
						}
					}
				}
			}
		});
		
//=================================================================Containers para Slots===============//		
	var Holder = enchant.Class.create({
		initialize: function(slots){
			this.slots = slots;
			//Método para consertar a ordem de exibição das cartas.
			this.fixZorder = function(){
				for(i=0;i<12;i++){
					game.rootScene.removeChild(this.slots[11-i]);
					game.rootScene.addChild(this.slots[11-i]);
				}
			}
			//Metodo para movimentação das cartas no descarte.
			this.updateSlots = function(asset){
				for(i=this.slots.length-1; i>-1;i--){
					if(i>0){
						this.slots[i].updateImage(this.slots[i-1].image);
						this.slots[i].updateName(this.slots[i-1].name);
						this.slots[i].isEmpty = this.slots[i-1].isEmpty;
						}
						else{
							this.slots[i].updateImage(asset.image);
							this.slots[i].updateName(asset.name);
							this.slots[i].isEmpty = false;
							}
					}
				}
			}
		});
		
	var Hand = enchant.Class.create({
		initialize: function(slots){
			this.slots = slots;
			this.updateSlots = function(asset){
				for(i=this.slots.length-1; i>-1;i--){
					if(i>0){
						this.slots[i].updateImage(this.slots[i-1].image);
						this.slots[i].updateName(this.slots[i-1].name);
						this.slots[i].isEmpty = this.slots[i-1].isEmpty;
						}
						else{
							this.slots[i].updateImage(asset.image);
							this.slots[i].updateName(asset.name);
							this.slots[i].isEmpty = false;
							}
					}
				}
			}
		});

	var Trinca = enchant.Class.create({
		initialize: function(slots){

			this.slots = slots;

			this.checkEndgame = function(){
				
				for(i=0; i<this.slots.length;i++){
					if(this.slots[i].isEmpty){
						return false;
						}
					}	
					this.exportTrinca();
					return true;
				}

			this.getTrinca = function(){
				
				return this.slots;
				}
			this.exportTrinca = function(){
				
				var resul = false;

				if(this.slots[0].name && this.slots[1].name && this.slots[2].name){
					trinca_export.push(this.slots[0].name);
					trinca_export.push(this.slots[1].name);
					trinca_export.push(this.slots[2].name);

					resul=true;
					}
					return resul;
				}
			}	
		});
//=====================================================================================================//
	//Criador de Slots
	var createSlots = function(nline, ncols, row, op){
		var content = [];
		var pos = 2;
	
		for(i=0;i<ncols*nline;i++){				
				if(pos>7){
					pos = 2;
					row++;
				}
				switch(op){
					case 0:{
						content.push(new Slot_trinca(desl_hor+pos*(sprite_width+spacing_hor)*sprite_scale,desl_ver+row*spacing_ver));
						break;
					}
					case 1:{
						content.push(new Slot_hand(desl_hor+pos*(sprite_width+spacing_hor)*sprite_scale,desl_ver+row*spacing_ver));
						break;
					}
					case 2:{
						content.push(new Slot_holder(desl_hor+pos*(sprite_width+spacing_hor)*sprite_scale,desl_ver+row*spacing_ver))
						break;
					}
				}
				pos++;
			}
			return content;
		}
		
    game.onload = function() {


		//cartas disponíveis para jogar.
		var cards = [];
		var card;
		var asset;
		var srt_card;

		for(i=1;i<101;i++){
			if(i<10){
				str_card = "casa-0" + i.toString();
				}
			else{
				str_card = "casa-" + i.toString();
				}

			var name = str_card;

			var path = "../imgs/cards/" + str_card + ".png";
			asset = game.assets[path];

			if(asset){
				
				card = new Card(name, asset);
				cards.push(card);
				}
		}

		//!!! Esta ordem precisa ser conservada. !!!
		//os argumentos de createSlots se refere a linha que a carta será posicionada e o tipo de slot;
		var holder = new Holder(createSlots(3,6,0,2));
			holder.fixZorder();
		var hand   = new Hand(createSlots(1,6,-3,1));
		var deck   = new Deck(desl_hor,desl_ver+spacing_ver, holder, hand, cards);
		deck.giveHand();
		var trinca = new Trinca(createSlots(1,3,-6, 0));
		var dealer = new Dealer(deck, trinca);
		//Destribui as 6 cards iniciais pro descarte.
		/*for(var i=0;i<6;i++){	
			//deck.giveCard(holder);
		}*/
		$("#enchant-stage").css("display","inline");
    };
    game.start();
};